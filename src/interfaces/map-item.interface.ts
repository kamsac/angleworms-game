import Velocity from '../types/velocity.type';
import MapPosition from '../types/map-position.type';
import Color from '../types/color.type';

interface IMapItem {
    setColor: (color: Color) => void;
    setPosition: (position: MapPosition) => void;
    getPosition: () => MapPosition;
    move: (velocity: Velocity) => void;
    draw: () => void;
}

export default IMapItem;