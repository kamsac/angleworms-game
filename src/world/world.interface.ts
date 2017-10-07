import Dimensions from './dimensions.type';
import Round from './round/round.interface';
import WorldObject from './world-object/world-object';
import WorldPosition from './world-position.type';

interface World {
    getSize: () => Dimensions;
    addWorldObject: (worldObject: WorldObject) => void;
    moveWorldObject: (worldObject: WorldObject, worldPosition: WorldPosition) => void;
    removeWorldObject: (worldObject: WorldObject) => void;
    getWorldObjects: (types?: string[]) => WorldObject[];
    getWorldObjectsAt: (worldPosition: WorldPosition, types?: string[]) => WorldObject[];
    removeWorldObjectsAt: (worldPosition: WorldPosition, types?: string[]) => void;
    getRandomEmptyPosition: () => WorldPosition;
    update: () => void;
    spawnApple: () => void;
    reset: () => void;
    getRound: () => Round;
}

export default World;
