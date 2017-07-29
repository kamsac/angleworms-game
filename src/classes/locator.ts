import Canvas from '../interfaces/canvas.interface';
import GameInput from '../interfaces/game-input.interface';
import Map from '../interfaces/map.interface';

export default class Locator {
    private static canvas: Canvas;
    private static map: Map;
    private static gameInput: GameInput;

    public static provideCanvas(canvas: Canvas): void {
        Locator.canvas = canvas;
    }

    public static getCanvas(): Canvas {
        return Locator.canvas;
    }

    public static provideMap(map: Map): void {
        Locator.map = map;
    }

    public static getMap(): Map {
        return Locator.map;
    }

    public static provideGameInput(gameInput: GameInput): void {
        Locator.gameInput = gameInput;
    }

    public static getGameInput(): GameInput {
        return Locator.gameInput;
    }
}
