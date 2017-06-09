import Dimensions from "../interfaces/dimensions.interface";

export default class Game {
    private resolution: Dimensions;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor() {
        this.resolution = {
            width: 400,
            height: 400
        };

        this.init();
    }

    private init(): void {
        this.initCanvas();
    }

    private initCanvas(): void {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.resolution.width;
        this.canvas.height = this.resolution.height;

        this.context = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);
    }
}