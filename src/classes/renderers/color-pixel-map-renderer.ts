import Map from '../../interfaces/map.interface';
import ColorPixelRepresentation from '../../types/color-pixel-representation.type';
import Dimensions from '../../types/dimensions.type';
import MapPosition from '../../types/map-position.type';
import Locator from '../locator';

export default class ColorPixelMapRenderer {
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
            const representation: ColorPixelRepresentation =
                mapItem.getRepresentation('ColorPixel') as ColorPixelRepresentation;
            this.context.fillStyle = representation.color;
            this.context.fillRect(
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
