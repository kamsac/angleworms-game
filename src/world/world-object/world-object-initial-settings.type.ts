import Representation from '../../renderers/representation.type';
import WorldPosition from '../world-position.type';

type WorldObjectInitialSettings = {
    representation?: Representation;
    position: WorldPosition;
}

export default WorldObjectInitialSettings;
