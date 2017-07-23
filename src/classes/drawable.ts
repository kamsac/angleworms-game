import ICanvas from '../interfaces/canvas.interface';
import IDrawable from '../interfaces/drawable.interface';
import Locator from './locator';

abstract class Drawable implements IDrawable {
    protected canvas: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D;
    private canvasService: ICanvas;

    public constructor() {
        this.canvasService = Locator.getCanvas();
        this.canvas = this.canvasService.getCanvas();
        this.context = this.canvasService.getContext();
    }

    public abstract draw(): void;
}

export default Drawable;
