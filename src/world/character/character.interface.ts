import CharacterHead from '../world-item/character-head';

interface Character {
    update: () => void;
    getHead: () => CharacterHead;
    isSafeToGoLeft: () => boolean;
    isSafeToGoUp: () => boolean;
    isSafeToGoRight: () => boolean;
    isSafeToGoDown: () => boolean;
    isSafeNotToChangeDirection: () => boolean;
    getTicksSinceAnyMove: () => number;
    shoot: () => void;
    die: () => void;
    spawnTail: () => void;
    removeDeadTail: () => void;
    goLeft: () => void;
    goUp: () => void;
    goRight: () => void;
    goDown: () => void;
    isMoving: () => boolean;
    isMovingLeft: () => boolean;
    isMovingUp: () => boolean;
    isMovingRight: () => boolean;
    isMovingDown: () => boolean;
    setSize: (size: number) => void;
    getSize: () => number;
}

export default Character;
