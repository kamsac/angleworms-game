import IDrawable from "../interfaces/drawable.interface";
import Locator from "./locator";
import ICanvas from "../interfaces/canvas.interface";

abstract class Drawable implements IDrawable {
    private canvasService: ICanvas;
    protected canvas: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D;

    public constructor() {
        this.canvasService = Locator.getCanvas();
        this.canvas = this.canvasService.getCanvas();
        this.context = this.canvasService.getContext();
    }

    public abstract draw(): void;
}

export default Drawable;