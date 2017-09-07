import Representation from '../../renderers/representation.type';
import Velocity from '../velocity.type';
import WorldPosition from '../world-position.type';
import CollisionDetectorComponent from './collision-detectors/player-collision-detector-component.interface';
import InputComponent from './player-inputs/player-input-component.interface';

type  PlayerInitialSettings = {
    representation: Representation;
    position: WorldPosition;
    velocity: Velocity;
    input: InputComponent;
    collisionDetector: CollisionDetectorComponent;
};

export default PlayerInitialSettings;
