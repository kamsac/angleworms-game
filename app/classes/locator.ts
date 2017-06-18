import ICanvas from "../interfaces/canvas.interface";
import IMap from "../interfaces/map.interface";

export default class Locator {
    private static canvas: ICanvas;
    private static map: IMap;

    public constructor() {

    }

    public static provideCanvas(canvas: ICanvas): void {
        Locator.canvas = canvas;
    }

    public static getCanvas(): ICanvas {
        return Locator.canvas;
    }

    public static provideMap(map: IMap): void {
        Locator.map = map;
    }

    public static getMap(): IMap {
        return Locator.map;
    }
}