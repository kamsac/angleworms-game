interface ICanvas {
    getCanvas: () => HTMLCanvasElement;
    getContext: () => CanvasRenderingContext2D;
}

export default ICanvas;