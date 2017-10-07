import AnyRepresentation from '../../renderers/any-representation.type';
import Representation from '../../renderers/representation.type';
import Time from '../../time';
import Dimensions from '../dimensions.type';
import Vector2D from '../vector-2d.type';
import WorldPositionHelper from '../world-position-helper';
import WorldPosition from '../world-position.type';
import World from '../world.interface';
import WorldObjectInitialSettings from './world-object-initial-settings.type';
import WorldObject from './world-object.interface';

class WorldObjectImpl implements WorldObject {
    protected type: string;
    protected position: WorldPosition;
    protected world: World;
    protected worldSize: Dimensions;
    protected speed: number;
    protected direction: Vector2D;
    protected ticksSinceMoved: Vector2D;
    protected representation: Representation;

    public constructor(initialSettings: WorldObjectInitialSettings) {
        this.world = initialSettings.world;
        this.worldSize = this.world.getSize();
        this.position = WorldPositionHelper.wrap(initialSettings.position, this.worldSize);
        this.speed = 0;
        this.direction = { x: 0, y: 0 };
        this.ticksSinceMoved = { x: 0, y: 0 };
        this.representation = {
            ColorPixel: {
                color: '#888',
            },
            Sprite: {
                spriteName: 'generic-world-object',
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
                WorldPositionHelper.getAdjacentFuturePosition(this.position, this.getVelocity()),
                this.worldSize,
            );
        const newPosition: WorldPosition = {
            x: this.position.x,
            y: this.position.y,
        };

        if (this.ticksSinceMoved.x++ >= Time.squaresPerSecondsToTicks(Math.abs(this.getVelocity().x))) {
            newPosition.x = futurePosition.x;
            this.ticksSinceMoved.x = 0;
            this.ticksSinceMoved.y = 0;
        }

        if (this.ticksSinceMoved.y++ >= Time.squaresPerSecondsToTicks(Math.abs(this.getVelocity().y))) {
            newPosition.y = futurePosition.y;
            this.ticksSinceMoved.x = 0;
            this.ticksSinceMoved.y = 0;
        }

        if (!WorldPositionHelper.equal(this.position, newPosition)) {
            const canMove: boolean = this.beforeMove();

            if (canMove) {
                this.world.moveWorldObject(this, newPosition);
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

    public getWorld(): World {
        return this.world;
    }

    public setSpeed(speed: number): void {
        this.speed = speed;
    }

    public getSpeed(): number {
        return this.speed;
    }

    public setDirection(direction: Vector2D): void {
        this.direction = direction;
    }

    public getDirection(): Vector2D {
        return this.direction;
    }

    public getVelocity(): Vector2D {
        return {
            x: this.direction.x * this.speed,
            y: this.direction.y * this.speed,
        };
    }

    public getTicksSinceMove(): Vector2D {
        return this.ticksSinceMoved;
    }

    public stop(): void {
        this.speed = 0;
    }

    public getType(): string {
        return this.type;
    }

    public getRepresentation(representationName?: string): Representation | AnyRepresentation {
        if (!representationName) {
            return this.representation;
        }

        if (!this.representation[representationName]) {
            throw new Error(`No such \`${representationName}\` representation ` +
                `in \`${this.constructor.name}\` implementation!`);
        }
        return this.representation[representationName];
    }

    public move(newPosition): void {
        newPosition = WorldPositionHelper.wrap(newPosition, this.worldSize);

        this.world.moveWorldObject(this, newPosition);
    }

    public getTicksSinceMoved(): Vector2D {
        return this.ticksSinceMoved;
    }

    public removeItself(): void {
        this.world.removeWorldObject(this);
    }

    protected beforeMove(): boolean {
        return true;
    }

    protected afterMove(): void {
        // do nothing
    }

    private registerItselfToWorld(): void {
        this.world.addWorldObject(this);
    }
}

export default WorldObjectImpl;
