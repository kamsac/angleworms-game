import IMapItem from '../interfaces/map-item.interface';
import IMap from '../interfaces/map.interface';
import Color from '../types/color.type';
import Dimensions from '../types/dimensions.type';
import MapPosition from '../types/map-position.type';
import Velocity from '../types/velocity.type';
import Drawable from './drawable';
import Locator from './locator';

class MapItem extends Drawable implements IMapItem {
    protected position: MapPosition;
    protected color: Color;
    protected map: IMap;
    protected squareDimensions: Dimensions;
    protected mapSize: Dimensions;

    public constructor() {
        super();
        this.color = '#aaa';
        this.map = Locator.getMap();
        this.squareDimensions = Locator.getMap().getSquareDimensions();
        this.mapSize = Locator.getMap().getSize();
        this.registerItselfToMap();
    }

    public draw(): void {
        const context = this.context;
        context.fillStyle = this.color;
        context.fillRect(this.position.x * this.squareDimensions.width,
                         this.position.y * this.squareDimensions.height,
                         this.squareDimensions.width, this.squareDimensions.height);
    }

    public setPosition(position: MapPosition) {
        this.position = position;
    }

    public getPosition(): MapPosition {
        return this.position;
    }

    public setColor(color: Color): void {
        this.color = color;
    }

    public move(velocity: Velocity): void {
        this.position.x = (this.mapSize.width + (this.position.x + velocity.x)) % this.mapSize.width;
        this.position.y = (this.mapSize.height + (this.position.y + velocity.y)) % this.mapSize.height;
    }

    private registerItselfToMap() {
        this.map.addMapItem(this);
    }
}

export default MapItem;
