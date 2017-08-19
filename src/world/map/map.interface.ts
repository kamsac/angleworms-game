import Dimensions from '../dimensions.type';
import MapItem from './map-item/map-item';
import MapPosition from './map-position.type';

interface Map {
    getSize: () => Dimensions;
    addMapItem: (mapItem: MapItem) => void;
    removeMapItem: (mapItem: MapItem) => void;
    getMapItems: () => MapItem[];
    getMapItemsAt: (position: MapPosition) => MapItem[];
}

export default Map;
