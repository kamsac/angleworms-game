import Renderable from '../../renderable.interface';
import Velocity from '../../velocity.type';
import MapPosition from '../map-position.type';

interface MapItem extends Renderable {
    setPosition: (position: MapPosition) => void;
    getPosition: () => MapPosition;
    move: (velocity: Velocity) => void;
}

export default MapItem;
