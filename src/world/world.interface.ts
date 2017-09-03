import Dimensions from './dimensions.type';
import WorldItem from './world-item/world-item';
import WorldPosition from './world-position.type';

interface World {
    getSize: () => Dimensions;
    addWorldItem: (worldItem: WorldItem) => void;
    moveWorldItem: (worldItem: WorldItem, position: WorldPosition) => void;
    removeWorldItem: (worldItem: WorldItem) => void;
    getWorldItems: () => WorldItem[];
    getWorldItemsAt: (position: WorldPosition) => WorldItem[];
}

export default World;
