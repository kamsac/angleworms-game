import ICanvas from "../interfaces/canvas.interface";
import Dimensions from "../types/dimensions.type";

class Canvas implements ICanvas {
    private resolution: Dimensions;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor() {
        this.resolution = {
            width: 400,
            height: 400
        };
        this.initCanvas();
    }

    private initCanvas(): void {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.resolution.width;
        this.canvas.height = this.resolution.height;

        this.context = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public getContext(): CanvasRenderingContext2D {
        return this.context;
    }
}

export default Canvas;