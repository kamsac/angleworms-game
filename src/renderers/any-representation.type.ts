import ColorPixelRepresentation from './canvas/color-pixel/color-pixel-representation.type';
import SpriteRepresentation from './canvas/sprite/sprite-representation.type';
import TerminalRepresentation from './terminal/terminal-representation.type';

type AnyRepresentation =
    ColorPixelRepresentation |
    SpriteRepresentation |
    TerminalRepresentation;

export default AnyRepresentation;
