import Velocity from '../types/velocity.type';

interface IMovable {
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

export default IMovable;