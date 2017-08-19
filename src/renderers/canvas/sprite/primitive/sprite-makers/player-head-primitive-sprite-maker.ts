import Color from '../../../../color.type';
import PlayerTailPrimitiveSpriteMaker from './player-tail-primitive-sprite-maker';

export default class PlayerHeadPrimitiveSpriteMaker extends PlayerTailPrimitiveSpriteMaker {

    public constructor(color: Color) {
        super(color);

        this.color = color;

        this.resolution = {width: 100, height: 100};
        this.setResolution(this.resolution);
        this.draw();
    }

    protected draw() {
        super.draw();

        this.drawEyes();
        this.drawMouth();
    }

    protected drawEyes() {
        this.context.fillStyle = '#000';
        this.context.fillRect(
            this.resolution.width * 0.2,
            this.resolution.height * 0.2,
            this.resolution.width * 0.2,
            this.resolution.height * 0.2,
        );
        this.context.fillRect(
            this.resolution.width * 0.8,
            this.resolution.height * 0.2,
            -this.resolution.width * 0.2,
            this.resolution.height * 0.2,
        );
    }

    protected drawMouth() {
        this.context.fillStyle = '#000';
        this.context.fillRect(
            this.resolution.width * 0.3,
            this.resolution.height * 0.8,
            this.resolution.width * 0.4,
            -this.resolution.height * 0.2,
        );
    }
}
