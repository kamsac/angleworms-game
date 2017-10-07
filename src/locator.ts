import GameInput from './game-input/game-input.interface';
import World from './world/world.interface';

export default class Locator {
    private static world: World;
    private static gameInput: GameInput;

    public static provideWorld(world: World): void {
        Locator.world = world;
    }

    public static getWorld(): World {
        return Locator.world;
    }

    public static provideGameInput(gameInput: GameInput): void {
        Locator.gameInput = gameInput;
    }

    public static getGameInput(): GameInput {
        return Locator.gameInput;
    }
}
