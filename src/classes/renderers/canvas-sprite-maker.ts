import SpriteMaker from '../../interfaces/sprite-maker.interface';
import CanvasImageSource from '../../types/canvas-image-source.type';
import CanvasRenderer from './canvas-renderer';

export default class CanvasSpriteMaker extends CanvasRenderer implements SpriteMaker {
    public constructor() {
        super();
    }

    public getSprite(): CanvasImageSource {
        return this.canvas;
    }
}
