import ColorPixelRepresentation from './color-pixel-representation.type';
import SpriteRepresentation from './sprite-representation.type';
import TerminalRepresentation from './terminal-representation.type';

type Representation = {
    ColorPixel?: ColorPixelRepresentation;
    Sprite?: SpriteRepresentation;
    Terminal?: TerminalRepresentation;
};

export default Representation;
