import Locator from '../../../locator';
import Dimensions from '../../../world/dimensions.type';
import WorldPosition from '../../../world/world-position.type';
import World from '../../../world/world.interface';
import ColorPixelRepresentation from './color-pixel-representation.type';

export default class ColorPixelWorldRenderer {
    private context: CanvasRenderingContext2D;
    private world: World;
    private tileSize: Dimensions;
    private resolution: Dimensions;

    public constructor(context: CanvasRenderingContext2D, world: World) {

        this.context = context;
        this.world = world;

        this.resolution = Locator.getGameResolution();
        this.loadTileSize();
    }

    public render(): void {
        for (const worldItem of this.world.getWorldItems()) {
            const worldItemPosition: WorldPosition = worldItem.getPosition();
            const representation: ColorPixelRepresentation =
                worldItem.getRepresentation('ColorPixel') as ColorPixelRepresentation;
            this.context.fillStyle = representation.color;
            this.context.fillRect(
                worldItemPosition.x * this.tileSize.width,
                worldItemPosition.y * this.tileSize.height,
                this.tileSize.width,
                this.tileSize.height,
            );
        }
    }

    private loadTileSize(): void {
        const worldResolution: Dimensions = Locator.getGameResolution();
        const worldSize: Dimensions = this.world.getSize();
        this.tileSize = {
            width: worldResolution.width / worldSize.width,
            height: worldResolution.height / worldSize.height,
        };
    }
}
