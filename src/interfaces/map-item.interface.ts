import Color from '../types/color.type';
import MapPosition from '../types/map-position.type';
import Velocity from '../types/velocity.type';

interface MapItem {
    setColor: (color: Color) => void;
    setPosition: (position: MapPosition) => void;
    getPosition: () => MapPosition;
    move: (velocity: Velocity) => void;
    draw: () => void;
}

export default MapItem;
