import GameInput from './game-input/game-input.interface';
import GameRenderer from './renderers/game-renderer.interface';

export default class Locator {
    private static gameInput: GameInput;
    private static gameRenderer: GameRenderer;

    public static provideGameInput(gameInput: GameInput): void {
        Locator.gameInput = gameInput;
    }

    public static getGameInput(): GameInput {
        return Locator.gameInput;
    }

    public static provideGameRenderer(gameRenderer: GameRenderer): void {
        Locator.gameRenderer = gameRenderer;
    }

    public static getGameRenderer(): GameRenderer {
        return Locator.gameRenderer;
    }
}
