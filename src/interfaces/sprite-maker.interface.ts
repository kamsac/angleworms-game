import CanvasImageSource from '../types/canvas-image-source.type';

interface SpriteMaker {
    getSprite: () => CanvasImageSource;
}

export default SpriteMaker;
