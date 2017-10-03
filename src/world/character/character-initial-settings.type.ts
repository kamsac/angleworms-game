import Representation from '../../renderers/representation.type';
import Vector2D from '../vector-2d.type';
import WorldPosition from '../world-position.type';
import InputComponent from './character-inputs/character-input-component.interface';
import CollisionDetectorComponent from './collision-detectors/character-collision-detector-component.interface';
import GunComponent from './gun/gun-component.interface';

type  CharacterInitialSettings = {
    representation: Representation;
    position: WorldPosition;
    speed: number;
    direction: Vector2D;
    input: InputComponent;
    collisionDetector: CollisionDetectorComponent;
    gun: GunComponent;
};

export default CharacterInitialSettings;
