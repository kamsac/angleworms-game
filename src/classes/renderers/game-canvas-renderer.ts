import Map from '../../interfaces/map.interface';
import Dimensions from '../../types/dimensions.type';
import Locator from '../locator';
import CanvasRenderer from './canvas-renderer';
import ColorPixelMapRenderer from './color-pixel-map-renderer';
import PrimitiveSpriteMapRenderer from './primitive-sprite-map-renderer';

class GameCanvasRenderer extends CanvasRenderer {
    protected resolution: Dimensions;
    protected map: Map;
    protected mapRenderer: ColorPixelMapRenderer | PrimitiveSpriteMapRenderer;

    public constructor(map: Map) {
        super();

        this.map = map;
        this.resolution = Locator.getGameResolution();
        this.mapRenderer = new ColorPixelMapRenderer(this.context, this.map);
        // this.mapRenderer = new PrimitiveSpriteMapRenderer(this.context, this.map);

        this.setResolution(this.resolution);
        this.attachCanvas();
    }

    public render(): void {
        this.clearCanvas();
        this.mapRenderer.render();
    }

    private attachCanvas(): void {
        document.body.appendChild(this.canvas);
    }
}

export default GameCanvasRenderer;
