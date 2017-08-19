import ColorPixelRepresentation from './canvas/color-pixel/color-pixel-representation.type';
import SpriteRepresentation from './canvas/sprite/sprite-representation.type';
import TerminalRepresentation from './terminal/terminal-representation.type';

type Representation = {
    ColorPixel?: ColorPixelRepresentation;
    Sprite?: SpriteRepresentation;
    Terminal?: TerminalRepresentation;
};

export default Representation;
