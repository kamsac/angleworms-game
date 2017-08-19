import Representation from '../../renderers/representation.type';
import MapPosition from '../map/map-position.type';
import Velocity from '../velocity.type';

type  PlayerInitialSettings = {
    representation: Representation;
    position: MapPosition;
    velocity: Velocity;
};

export default PlayerInitialSettings;
