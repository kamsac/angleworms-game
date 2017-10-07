import Dimensions from '../../world/dimensions.type';
import World from '../../world/world.interface';
import CanvasRenderer from './canvas-renderer';
import CanvasRendererConfiguration from './canvas-renderer-configuration';
import ColorPixelWorldRenderer from './color-pixel/color-pixel-world-renderer';
import PrimitiveSpriteWorldRenderer from './sprite/primitive/primitive-sprite-world-renderer';

class GameCanvasRenderer extends CanvasRenderer {
    protected resolution: Dimensions;
    protected world: World;
    protected worldRenderer: ColorPixelWorldRenderer | PrimitiveSpriteWorldRenderer;

    public constructor(world: World) {
        super();

        this.world = world;
        this.resolution = CanvasRendererConfiguration.RESOLUTION;
        this.worldRenderer = new ColorPixelWorldRenderer(this.context, this.world);
        // this.worldRenderer = new PrimitiveSpriteWorldRenderer(this.context, this.world);

        this.setResolution(this.resolution);
        this.attachCanvas();
    }

    public render(): void {
        this.clearCanvas();
        this.worldRenderer.render();
    }

    private attachCanvas(): void {
        document.body.appendChild(this.canvas);
    }
}

export default GameCanvasRenderer;
