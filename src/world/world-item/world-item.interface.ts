import Renderable from '../renderable.interface';
import Velocity from '../velocity.type';
import WorldPosition from '../world-position.type';

interface WorldItem extends Renderable {
    setPosition: (position: WorldPosition) => void;
    getPosition: () => WorldPosition;
    move: (velocity: Velocity) => void;
}

export default WorldItem;
