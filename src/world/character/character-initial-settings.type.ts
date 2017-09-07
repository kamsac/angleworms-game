import Representation from '../../renderers/representation.type';
import Velocity from '../velocity.type';
import WorldPosition from '../world-position.type';
import CollisionDetectorComponent from './collision-detectors/character-collision-detector-component.interface';
import InputComponent from './character-inputs/character-input-component.interface';

type  CharacterInitialSettings = {
    representation: Representation;
    position: WorldPosition;
    velocity: Velocity;
    input: InputComponent;
    collisionDetector: CollisionDetectorComponent;
};

export default CharacterInitialSettings;
