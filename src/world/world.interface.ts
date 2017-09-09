import Dimensions from './dimensions.type';
import WorldItem from './world-item/world-item';
import WorldPosition from './world-position.type';

interface World {
    getSize: () => Dimensions;
    addWorldItem: (worldItem: WorldItem) => void;
    moveWorldItem: (worldItem: WorldItem, worldPosition: WorldPosition) => void;
    removeWorldItem: (worldItem: WorldItem) => void;
    getWorldItems: (types?: string[]) => WorldItem[];
    getWorldItemsAt: (worldPosition: WorldPosition, types?: string[]) => WorldItem[];
    removeWorldItemsAt: (worldPosition: WorldPosition, types?: string[]) => void;
}

export default World;
