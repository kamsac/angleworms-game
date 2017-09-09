import Renderable from '../renderable.interface';
import Velocity from '../velocity.type';
import WorldPosition from '../world-position.type';

interface WorldItem extends Renderable {
    setPosition: (position: WorldPosition) => void;
    getPosition: () => WorldPosition;
    getType: () => string;
    move: (velocity: Velocity) => void;
}

export default WorldItem;
