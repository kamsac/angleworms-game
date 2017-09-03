import Representation from '../../renderers/representation.type';
import WorldPosition from '../world-position.type';

type WorldItemInitialSettings = {
    representation?: Representation;
    position: WorldPosition;
}

export default WorldItemInitialSettings;
