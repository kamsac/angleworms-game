import Map from '../interfaces/map.interface';
import Color from '../types/color.type';
import Dimensions from '../types/dimensions.type';
import MapPosition from '../types/map-position.type';
import MapItem from './map-item';

export default class MapImpl implements Map {
    private size: Dimensions;
    private backgroundColor: Color;
    private mapItems: MapItem[];

    public constructor(size: Dimensions = {width: 20, height: 20}) {
        this.size = size;
        this.backgroundColor = '#000';
        this.mapItems = [];
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
}
