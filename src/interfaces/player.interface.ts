import IDrawable from './drawable.interface';
import IMovable from './movable.interface';
import ISizable from './sizable.interface';
import Head from '../classes/head';

interface IPlayer extends IDrawable, IMovable, ISizable {
    getHead: () => Head;
    isSafeToGoLeft: () => boolean;
    isSafeToGoUp: () => boolean;
    isSafeToGoRight: () => boolean;
    isSafeToGoDown: () => boolean;
    isSafeNotToChangeDirection: () => boolean;
    getTicksToMove: () => number;
    getTicksToMoveDelay: () => number;
}

export default IPlayer;
