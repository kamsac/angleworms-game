import CharacterHead from '../world-item/character-head';
import Movable from './movable.interface';
import Sizable from './sizable.interface';

interface Character extends Movable, Sizable {
    update: () => void;
    getHead: () => CharacterHead;
    isSafeToGoLeft: () => boolean;
    isSafeToGoUp: () => boolean;
    isSafeToGoRight: () => boolean;
    isSafeToGoDown: () => boolean;
    isSafeNotToChangeDirection: () => boolean;
    getTicksToMove: () => number;
    getTicksToMoveDelay: () => number;
}

export default Character;
