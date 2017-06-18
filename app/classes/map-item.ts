import Drawable from "./drawable";
import Locator from "./locator";
import Dimensions from "../types/dimensions.type";
import MapPosition from "../types/map-position.type";
import IMapItem from "../interfaces/map-item.interface";
import Color from "../types/color.type";
import Velocity from "../types/velocity.type";

class MapItem extends Drawable implements IMapItem {
    protected position: MapPosition;
    protected color: Color;
    protected squareDimensions: Dimensions = Locator.getMap().getSquareDimensions();
    protected mapSize: Dimensions = Locator.getMap().getSize();

    public constructor() {
        super();
        this.color = '#aaa';
    }

    public draw(): void {
        let context = this.context;
        context.fillStyle = this.color;
        context.fillRect(this.position.x * this.squareDimensions.width,
                         this.position.y * this.squareDimensions.height,
                         this.squareDimensions.width, this.squareDimensions.height);
    }

    public setPosition(position: MapPosition) {
        this.position = position;
    }

    public setColor(color: Color): void {
        this.color = color;
    }

    public move(velocity: Velocity): void {
        this.position.x = (this.mapSize.width + (this.position.x + velocity.x)) % this.mapSize.width;
        this.position.y = (this.mapSize.height + (this.position.y + velocity.y)) % this.mapSize.height;
    }
}

export default MapItem;