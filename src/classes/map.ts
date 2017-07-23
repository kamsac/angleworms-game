import IMap from '../interfaces/map.interface';
import Color from '../types/color.type';
import Dimensions from '../types/dimensions.type';
import MapPosition from '../types/map-position.type';
import Drawable from './drawable';
import MapItem from './map-item';

export default class Map extends Drawable implements IMap {
    private dimensions: Dimensions;
    private size: Dimensions;
    private squareDimensions: Dimensions;
    private backgroundColor: Color;
    private mapItems: MapItem[];

    public constructor(size: Dimensions = {width: 20, height: 20}) {
        super();
        this.dimensions = {
            width: this.canvas.width,
            height: this.canvas.height,
        };
        this.squareDimensions = {
            width: 1,
            height: 1,
        };
        this.size = size;
        this.backgroundColor = '#000';
        this.mapItems = [];
        this.calculateSquareDimensions();
    }

    public draw(): void {
        const context = this.context;

        context.fillStyle = this.backgroundColor;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }

    public getSquareDimensions(): Dimensions {
        return this.squareDimensions;
    }

    public getSize(): Dimensions {
        return this.size;
    }

    public addMapItem(mapItem: MapItem): void {
        this.mapItems.push(mapItem);
    }

    public removeMapItem(mapItem: MapItem): void {
        const index: number = this.mapItems.indexOf(mapItem);
        this.mapItems.splice(index, 1);
    }

    public getMapItems() {
        return this.mapItems;
    }

    public getMapItemsAt(mapPosition: MapPosition): MapItem[] {
        return this.mapItems.filter((mapItem: MapItem) => {
            return (mapItem.getPosition().x === mapPosition.x &&
                    mapItem.getPosition().y === mapPosition.y);
        });
    }

    private calculateSquareDimensions(): void {
        this.squareDimensions.width = this.dimensions.width / this.size.width;
        this.squareDimensions.height = this.dimensions.height / this.size.height;
    }
}
