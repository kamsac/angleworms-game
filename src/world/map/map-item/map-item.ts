import Locator from '../../../locator';
import AnyRepresentation from '../../../renderers/any-representation.type';
import Representation from '../../../renderers/representation.type';
import Dimensions from '../../dimensions.type';
import Velocity from '../../velocity.type';
import MapPosition from '../map-position.type';
import Map from '../map.interface';
import MapItem from './map-item.interface';

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
