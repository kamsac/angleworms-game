import Locator from '../../../../locator';
import Dimensions from '../../../../world/dimensions.type';
import MapPosition from '../../../../world/map/map-position.type';
import Map from '../../../../world/map/map.interface';
import SpriteRepresentation from '../sprite-representation.type';
import PrimitiveSpriteCache from './primitive-sprite-cache';

export default class PrimitiveSpriteMapRenderer {
    private context: CanvasRenderingContext2D;
    private map: Map;
    private tileSize: Dimensions;
    private resolution: Dimensions;

    public constructor(context: CanvasRenderingContext2D, map: Map) {

        this.context = context;
        this.map = map;

        this.resolution = Locator.getGameResolution();
        this.loadTileSize();
    }

    public render(): void {
        for (const mapItem of this.map.getMapItems()) {
            const mapItemPosition: MapPosition = mapItem.getPosition();
            const representation: SpriteRepresentation =
                mapItem.getRepresentation('Sprite') as SpriteRepresentation;

            this.context.drawImage(
                PrimitiveSpriteCache.getSprite(representation.spriteName),
                mapItemPosition.x * this.tileSize.width,
                mapItemPosition.y * this.tileSize.height,
                this.tileSize.width,
                this.tileSize.height,
            );
        }
    }

    private loadTileSize(): void {
        const mapResolution: Dimensions = Locator.getGameResolution();
        const mapSize: Dimensions = this.map.getSize();
        this.tileSize = {
            width: mapResolution.width / mapSize.width,
            height: mapResolution.height / mapSize.height,
        };
    }
}