import CanvasSpriteMaker from './canvas-sprite-maker';

export default class UnknownPrimitiveSpriteMaker extends CanvasSpriteMaker {
    public constructor() {
        super();

        this.resolution = {width: 10, height: 10};
        this.setResolution(this.resolution);
        this.draw();
    }

    private draw() {
        this.context.lineWidth = 0;
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.resolution.width, this.resolution.height);

        const colorDot: ImageData = this.context.createImageData(1, 1);
        colorDot.data[0] = 255;
        colorDot.data[1] = 0;
        colorDot.data[2] = 255;
        colorDot.data[3] = 255;

        for (let y = 0; y < this.resolution.width; y += 1) {
            for (let x = 0; x < this.resolution.height; x += 1) {
                if (x % 2 === y % 2) {
                    this.context.putImageData(colorDot, x, y);
                }
            }
        }
    }
}
