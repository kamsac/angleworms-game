import Locator from '../../../../locator';
import Dimensions from '../../../../world/dimensions.type';
import WorldPosition from '../../../../world/world-position.type';
import World from '../../../../world/world.interface';
import SpriteRepresentation from '../sprite-representation.type';
import PrimitiveSpriteCache from './primitive-sprite-cache';

export default class PrimitiveSpriteWorldRenderer {
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
        for (const worldObject of this.world.getWorldObjects()) {
            const worldObjectPosition: WorldPosition = worldObject.getPosition();
            const representation: SpriteRepresentation =
                worldObject.getRepresentation('Sprite') as SpriteRepresentation;

            this.context.drawImage(
                PrimitiveSpriteCache.getSprite(representation.spriteName),
                worldObjectPosition.x * this.tileSize.width,
                worldObjectPosition.y * this.tileSize.height,
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
