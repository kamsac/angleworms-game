import GameInput from './game-input/game-input.interface';

export default class Locator {
    private static gameInput: GameInput;

    public static provideGameInput(gameInput: GameInput): void {
        Locator.gameInput = gameInput;
    }

    public static getGameInput(): GameInput {
        return Locator.gameInput;
    }
}
