import Velocity from '../velocity.type';
import CharacterHead from '../world-item/character-head';
import Movable from './movable.interface';
import Sizable from './sizable.interface';

interface Character extends Movable, Sizable {
    update: () => void;
    getHead: () => CharacterHead;
    getVelocity: () => Velocity;
    isSafeToGoLeft: () => boolean;
    isSafeToGoUp: () => boolean;
    isSafeToGoRight: () => boolean;
    isSafeToGoDown: () => boolean;
    isSafeNotToChangeDirection: () => boolean;
    getTicksToMove: () => number;
    getTicksToMoveDelay: () => number;
    shoot: () => void;
}

export default Character;
