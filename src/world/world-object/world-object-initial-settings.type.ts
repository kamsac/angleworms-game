import Representation from '../../renderers/representation.type';
import WorldPosition from '../world-position.type';
import World from '../world.interface';

type WorldObjectInitialSettings = {
    representation?: Representation;
    position: WorldPosition;
    world: World;
};

export default WorldObjectInitialSettings;
