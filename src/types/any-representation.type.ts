import ColorPixelRepresentation from './color-pixel-representation.type';
import SpriteRepresentation from './sprite-representation.type';
import TerminalRepresentation from './terminal-representation.type';

type AnyRepresentation =
    ColorPixelRepresentation |
    SpriteRepresentation |
    TerminalRepresentation;

export default AnyRepresentation;
