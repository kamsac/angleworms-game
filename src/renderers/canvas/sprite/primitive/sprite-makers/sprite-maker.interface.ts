import CanvasImageSource from '../../../canvas-image-source.type';

interface SpriteMaker {
    getSprite: () => CanvasImageSource;
}

export default SpriteMaker;
