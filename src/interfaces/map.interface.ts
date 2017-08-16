import MapItem from '../classes/map-item';
import Dimensions from '../types/dimensions.type';
import MapPosition from '../types/map-position.type';

interface Map {
    getSize: () => Dimensions;
    addMapItem: (mapItem: MapItem) => void;
    removeMapItem: (mapItem: MapItem) => void;
    getMapItems: () => MapItem[];
    getMapItemsAt: (position: MapPosition) => MapItem[];
}

export default Map;
