import Drawable from "./drawable";
import Dimensions from "../types/dimensions.type";
import IMap from "../interfaces/map.interface";
import Color from "../types/color.type";

export default class Map extends Drawable implements IMap {
    private dimensions: Dimensions;
    private size: Dimensions;
    private squareDimensions: Dimensions;
    private backgroundColor: Color;

    public constructor(size: Dimensions = {width: 20, height: 20}) {
        super();
        this.dimensions = {
            width: this.canvas.width,
            height: this.canvas.height
        };
        this.squareDimensions = {
            width: 1,
            height: 1
        };
        this.size = size;
        this.backgroundColor = '#000';
        this.calculateSquareDimensions();
    }

    public draw(): void {
        let ctx = this.context;

        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    public getSquareDimensions(): Dimensions {
        return this.squareDimensions;
    }

    public getSize(): Dimensions {
        return this.size;
    }

    private calculateSquareDimensions(): void {
        this.squareDimensions.width = this.dimensions.width / this.size.width;
        this.squareDimensions.height = this.dimensions.height / this.size.height;
    }
}