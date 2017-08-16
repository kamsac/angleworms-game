import MapPosition from '../types/map-position.type';
import Velocity from '../types/velocity.type';
import Renderable from './renderable.interface';

interface MapItem extends Renderable {
    setPosition: (position: MapPosition) => void;
    getPosition: () => MapPosition;
    move: (velocity: Velocity) => void;
}

export default MapItem;
