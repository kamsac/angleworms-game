import Velocity from "../types/velocity.type";

interface IMovable {
    setVelocity: (velocity: Velocity) => void;
    getVelocity: () => Velocity;
}

export default IMovable;