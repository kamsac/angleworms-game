import Dimensions from "../types/dimensions.type";
import MapItem from "../classes/map-item";
import MapPosition from "../types/map-position.type";

interface IMap {
    getSquareDimensions: () => Dimensions;
    getSize: () => Dimensions;
    draw: () => void;
    addMapItem: (mapItem: MapItem) => void;
    removeMapItem: (mapItem: MapItem) => void;
    getMapItems: () => MapItem[];
    getMapItemsAt: (position: MapPosition) => MapItem[];
}

export default IMap;