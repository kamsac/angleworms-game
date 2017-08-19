import Color from '../../../../color.type';
import CanvasSpriteMaker from './canvas-sprite-maker';

export default class PlayerTailPrimitiveSpriteMaker extends CanvasSpriteMaker {
    protected color: Color;

    public constructor(color: Color) {
        super();

        this.color = color;

        this.resolution = {width: 100, height: 100};
        this.setResolution(this.resolution);
        this.draw();
    }

    protected draw() {
        this.drawSkin();
    }

    protected drawSkin() {
        this.context.lineWidth = 0;
        this.context.fillStyle = this.color;
        this.context.fillRect(0, 0, this.resolution.width, this.resolution.height);

        for (let y = 0; y < this.resolution.width; y += 1) {
            for (let x = 0; x < this.resolution.height; x += 1) {
                if (x % 2 === y % 3) {
                    const colorDot: ImageData = this.context.createImageData(1, 1);
                    colorDot.data[0] = Math.floor(Math.random() * 128) + 64;
                    colorDot.data[1] = Math.floor(Math.random() * 128) + 64;
                    colorDot.data[2] = Math.floor(Math.random() * 128) + 64;
                    colorDot.data[3] = 255;

                    this.context.putImageData(colorDot, x, y);
                }
            }
        }
    }
}
