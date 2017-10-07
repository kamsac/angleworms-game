import Dimensions from '../../world/dimensions.type';
import World from '../../world/world.interface';
import GameRenderer from '../game-renderer.interface';
import CanvasRenderer from './canvas-renderer';
import CanvasRendererConfiguration from './canvas-renderer-configuration';
import ColorPixelWorldRenderer from './color-pixel/color-pixel-world-renderer';
import PrimitiveSpriteWorldRenderer from './sprite/primitive/primitive-sprite-world-renderer';

class GameCanvasRenderer extends CanvasRenderer implements GameRenderer {
    protected resolution: Dimensions;
    protected worldRenderer: ColorPixelWorldRenderer | PrimitiveSpriteWorldRenderer;

    public constructor() {
        super();

        this.resolution = CanvasRendererConfiguration.RESOLUTION;

        this.setResolution(this.resolution);
        this.attachCanvas();
    }

    public render(): void {
        this.clearCanvas();

        if (this.worldRenderer) {
            this.worldRenderer.render();
        }
    }

    public setWorldRenderer(world: World): void {
        this.worldRenderer = new ColorPixelWorldRenderer(this.context, world);
        // this.worldRenderer = new PrimitiveSpriteWorldRenderer(this.context, world);
    }

    private attachCanvas(): void {
        document.body.appendChild(this.canvas);
    }
}

export default GameCanvasRenderer;
