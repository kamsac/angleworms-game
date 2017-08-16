import MapPosition from './map-position.type';
import Representation from './representation.type';
import Velocity from './velocity.type';

type  PlayerInitialSettings = {
    representation: Representation;
    position: MapPosition;
    velocity: Velocity;
};

export default PlayerInitialSettings;
