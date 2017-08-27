import Representation from '../../renderers/representation.type';
import WorldPosition from '../world-position.type';
import Velocity from '../velocity.type';

type  PlayerInitialSettings = {
    representation: Representation;
    position: WorldPosition;
    velocity: Velocity;
};

export default PlayerInitialSettings;
