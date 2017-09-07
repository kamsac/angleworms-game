import Velocity from '../velocity.type';

interface Movable {
    setVelocity: (velocity: Velocity) => void;
    getVelocity: () => Velocity;
    goLeft: () => void;
    goUp: () => void;
    goRight: () => void;
    goDown: () => void;
    isMoving: () => boolean;
    isMovingLeft: () => boolean;
    isMovingUp: () => boolean;
    isMovingRight: () => boolean;
    isMovingDown: () => boolean;
}

export default Movable;
