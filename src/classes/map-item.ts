import MapItem from '../interfaces/map-item.interface';
import Map from '../interfaces/map.interface';
import AnyRepresentation from '../types/any-representation.type';
import Dimensions from '../types/dimensions.type';
import MapPosition from '../types/map-position.type';
import Representation from '../types/representation.type';
import Velocity from '../types/velocity.type';
import Locator from './locator';

class MapItemImpl implements MapItem {
    protected type: string;
    protected position: MapPosition;
    protected map: Map;
    protected mapSize: Dimensions;
    protected representation: Representation;

    public constructor(representation?: Representation) {
        this.map = Locator.getMap();
        this.mapSize = Locator.getMap().getSize();
        this.representation = {
            ColorPixel: {
                color: '#888',
            },
            Sprite: {
                spriteName: 'generic-map-item',
            },
        };
        for (const renderer in representation) {
            if (this.representation.hasOwnProperty(renderer)) {
                this.representation[renderer] = representation[renderer];
            }
        }

        this.registerItselfToMap();
    }

    public setPosition(position: MapPosition): void {
        this.position = position;
    }

    public getPosition(): MapPosition {
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
        this.position.x = (this.mapSize.width + (this.position.x + velocity.x)) % this.mapSize.width;
        this.position.y = (this.mapSize.height + (this.position.y + velocity.y)) % this.mapSize.height;
    }

    private registerItselfToMap(): void {
        this.map.addMapItem(this);
    }
}

export default MapItemImpl;
