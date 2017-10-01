import Locator from '../../locator';
import AnyRepresentation from '../../renderers/any-representation.type';
import Representation from '../../renderers/representation.type';
import Dimensions from '../dimensions.type';
import VelocityHelper from '../velocity-helper';
import Velocity from '../velocity.type';
import WorldPositionHelper from '../world-position-helper';
import WorldPosition from '../world-position.type';
import World from '../world.interface';
import WorldItemInitialSettings from './world-item-initial-settings.type';
import WorldItem from './world-item.interface';

class WorldItemImpl implements WorldItem {
    protected type: string;
    protected position: WorldPosition;
    protected world: World;
    protected worldSize: Dimensions;
    protected velocity: Velocity;
    protected ticksSinceMoved: Velocity;
    protected representation: Representation;

    public constructor(initialSettings: WorldItemInitialSettings) {
        this.world = Locator.getWorld();
        this.worldSize = Locator.getWorld().getSize();
        this.position = WorldPositionHelper.wrap(initialSettings.position, this.worldSize);
        this.velocity = { x: 0, y: 0 };
        this.ticksSinceMoved = { x: 0, y: 0};
        this.representation = {
            ColorPixel: {
                color: '#888',
            },
            Sprite: {
                spriteName: 'generic-world-item',
            },
        };
        for (const renderer in initialSettings.representation) {
            if (this.representation.hasOwnProperty(renderer)) {
                this.representation[renderer] = initialSettings.representation[renderer];
            }
        }
        this.registerItselfToWorld();
    }

    public update(): void {
        const futurePosition: WorldPosition =
            WorldPositionHelper.wrap(
                WorldPositionHelper.getAdjacentFuturePosition(this.position, this.velocity),
                this.worldSize,
            );
        const newPosition: WorldPosition = {
            x: this.position.x,
            y: this.position.y,
        };

        if (this.ticksSinceMoved.x++ >= VelocityHelper.speedToTicks(this.velocity.x)) {
            newPosition.x = futurePosition.x;
            this.ticksSinceMoved.x = 0;
            this.ticksSinceMoved.y = 0;
        }

        if (this.ticksSinceMoved.y++ >= VelocityHelper.speedToTicks(this.velocity.y)) {
            newPosition.y = futurePosition.y;
            this.ticksSinceMoved.x = 0;
            this.ticksSinceMoved.y = 0;
        }

        if (!WorldPositionHelper.equal(this.position, newPosition)) {
            const canMove: boolean = this.beforeMove();

            if (canMove) {
                this.world.moveWorldItem(this, newPosition);
                this.afterMove();
            }
        }
    }

    public setPosition(position: WorldPosition): void {
        this.position = position;
    }

    public getPosition(): WorldPosition {
        return this.position;
    }

    public setVelocity(velocity: Velocity): void {
        this.velocity = velocity;
    }

    public getVelocity(): Velocity {
        return this.velocity;
    }

    public getTicksSinceMove(): Velocity {
        return this.ticksSinceMoved;
    }

    public stop(): void {
        this.setVelocity({x: 0, y: 0});
    }

    public getType(): string {
        return this.type;
    }

    public getRepresentation(representationName: string): AnyRepresentation {
        if (!this.representation[representationName]) {
            throw new Error(`No such \`${representationName}\` representation ` +
                `in \`${this.constructor.name}\` implementation!`);
        }
        return this.representation[representationName];
    }

    public move(newPosition): void {
        newPosition = WorldPositionHelper.wrap(newPosition, this.worldSize);

        this.world.moveWorldItem(this, newPosition);
    }

    public getTicksSinceMoved(): Velocity {
        return this.ticksSinceMoved;
    }

    public removeItself(): void {
        this.world.removeWorldItem(this);
    }

    protected beforeMove(): boolean {
        return true;
    }

    protected afterMove(): void {
        // do nothing
    }

    private registerItselfToWorld(): void {
        this.world.addWorldItem(this);
    }
}

export default WorldItemImpl;
