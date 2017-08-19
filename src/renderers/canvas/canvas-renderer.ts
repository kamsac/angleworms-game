import Dimensions from '../../world/dimensions.type';

class CanvasRenderer {
    protected canvas: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D;
    protected resolution: Dimensions;

    public constructor() {
        this.createCanvas();
    }

    protected setResolution(dimensions: Dimensions) {
        this.canvas.width = dimensions.width;
        this.canvas.height = dimensions.height;
    }

    protected clearCanvas(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private createCanvas(): void {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
    }
}

export default CanvasRenderer;
