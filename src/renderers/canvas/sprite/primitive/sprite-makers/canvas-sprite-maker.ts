import CanvasImageSource from '../../../canvas-image-source.type';
import CanvasRenderer from '../../../canvas-renderer';
import SpriteMaker from './sprite-maker.interface';

export default class CanvasSpriteMaker extends CanvasRenderer implements SpriteMaker {
    public constructor() {
        super();
    }

    public getSprite(): CanvasImageSource {
        return this.canvas;
    }
}
