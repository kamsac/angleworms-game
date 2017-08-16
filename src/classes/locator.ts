import GameInput from '../interfaces/game-input.interface';
import Map from '../interfaces/map.interface';
import Dimensions from '../types/dimensions.type';

export default class Locator {
    private static map: Map;
    private static gameInput: GameInput;
    private static gameResolution: Dimensions;

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

    public static provideGameResolution(gameResolution: Dimensions): void {
        Locator.gameResolution = gameResolution;
    }

    public static getGameResolution(): Dimensions {
        return Locator.gameResolution;
    }
}
