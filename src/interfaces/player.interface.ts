import PlayerHead from '../classes/player-head';
import Drawable from './drawable.interface';
import Movable from './movable.interface';
import Sizable from './sizable.interface';

interface Player extends Drawable, Movable, Sizable {
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
