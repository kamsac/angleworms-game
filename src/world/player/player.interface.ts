import PlayerHead from '../world-item/player-head';
import Movable from './movable.interface';
import Sizable from './sizable.interface';

interface Player extends Movable, Sizable {
    getHead: () => PlayerHead;
    isSafeToGoLeft: () => boolean;
    isSafeToGoUp: () => boolean;
    isSafeToGoRight: () => boolean;
    isSafeToGoDown: () => boolean;
    isSafeNotToChangeDirection: () => boolean;
    getTicksToMove: () => number;
    getTicksToMoveDelay: () => number;
}

export default Player;
