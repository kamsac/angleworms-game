import Locator from '../../locator';
import AnyRepresentation from '../../renderers/any-representation.type';
import Representation from '../../renderers/representation.type';
import Dimensions from '../dimensions.type';
import Velocity from '../velocity.type';
import WorldPosition from '../world-position.type';
import World from '../world.interface';
import WorldItem from './world-item.interface';

class WorldItemImpl implements WorldItem {
    protected type: string;
    protected position: WorldPosition;
    protected world: World;
    protected worldSize: Dimensions;
    protected representation: Representation;

    public constructor(representation?: Representation) {
        this.world = Locator.getWorld();
        this.worldSize = Locator.getWorld().getSize();
        this.representation = {
            ColorPixel: {
                color: '#888',
            },
            Sprite: {
                spriteName: 'generic-world-item',
            },
        };
        for (const renderer in representation) {
            if (this.representation.hasOwnProperty(renderer)) {
                this.representation[renderer] = representation[renderer];
            }
        }

        this.registerItselfToWorld();
    }

    public setPosition(position: WorldPosition): void {
        this.position = position;
    }

    public getPosition(): WorldPosition {
        return this.position;
    }

    public getRepresentation(representationName: string): AnyRepresentation {
        if (!this.representation[representationName]) {
            throw new Error(`No such \`${representationName}\` representation ` +
                `in \`${this.constructor.name}\` implementation!`);
        }
        return this.representation[representationName];
    }

    public move(velocity: Velocity): void {
        this.position.x = (this.worldSize.width + (this.position.x + velocity.x)) % this.worldSize.width;
        this.position.y = (this.worldSize.height + (this.position.y + velocity.y)) % this.worldSize.height;
    }

    private registerItselfToWorld(): void {
        this.world.addWorldItem(this);
    }
}

export default WorldItemImpl;
