import Renderable from '../renderable.interface';
import Velocity from '../velocity.type';
import WorldPosition from '../world-position.type';

interface WorldItem extends Renderable {
    setPosition: (position: WorldPosition) => void;
    getPosition: () => WorldPosition;
    setVelocity: (velocity: Velocity) => void;
    getVelocity: () => Velocity;
    stop: () => void;
    getTicksSinceMoved: () => Velocity;
    getType: () => string;
    move: (velocity: Velocity) => void;
    removeItself: () => void;
    update: () => void;
}

export default WorldItem;
