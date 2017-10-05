import Locator from '../../../locator';
import Dimensions from '../../../world/dimensions.type';
import WorldPosition from '../../../world/world-position.type';
import World from '../../../world/world.interface';
import ColorPixelRepresentation from './color-pixel-representation.type';

export default class ColorPixelWorldRenderer {
    private context: CanvasRenderingContext2D;
    private world: World;
    private tileSize: Dimensions;
    private drawingOffset: Dimensions;
    private resolution: Dimensions;

    public constructor(context: CanvasRenderingContext2D, world: World) {

        this.context = context;
        this.world = world;

        this.resolution = Locator.getGameResolution();
        this.loadTileSize();
        this.loadDrawingOffset();
    }

    public render(): void {
        for (const worldObject of this.world.getWorldObjects()) {
            const worldObjectPosition: WorldPosition = worldObject.getPosition();
            const representation: ColorPixelRepresentation =
                worldObject.getRepresentation('ColorPixel') as ColorPixelRepresentation;
            this.context.fillStyle = representation.color;
            this.context.fillRect(
                Math.floor(worldObjectPosition.x * this.tileSize.width + this.drawingOffset.width),
                Math.floor(worldObjectPosition.y * this.tileSize.height + this.drawingOffset.height),
                Math.ceil(this.tileSize.width),
                Math.ceil(this.tileSize.height),
            );
        }
    }

    private loadTileSize(): void {
        const worldSize: Dimensions = this.world.getSize();
        const maxWorldSize: number = Math.max(worldSize.width, worldSize.height);
        this.tileSize = {
            width: this.resolution.width / maxWorldSize,
            height: this.resolution.height / maxWorldSize,
        };
    }

    private loadDrawingOffset(): void {
        const worldSize: Dimensions = this.world.getSize();
        const tilesWidth: number = worldSize.width * this.tileSize.width;
        const tilesHeight: number = worldSize.height * this.tileSize.height;
        this.drawingOffset = {
            width: (this.resolution.width - tilesWidth) / 2,
            height: (this.resolution.height - tilesHeight) / 2,
        };
    }
}
