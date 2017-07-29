import Canvas from '../interfaces/canvas.interface';
import Drawable from '../interfaces/drawable.interface';
import Locator from './locator';

abstract class DrawableImpl implements Drawable {
    protected canvas: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D;
    private canvasService: Canvas;

    public constructor() {
        this.canvasService = Locator.getCanvas();
        this.canvas = this.canvasService.getCanvas();
        this.context = this.canvasService.getContext();
    }

    public abstract draw(): void;
}

export default DrawableImpl;
