import IInputComponent from "../interfaces/input-component.interface";
import IPlayer from "../interfaces/player.interface";
import IGameInput from "../interfaces/game-input.interface";
import Locator from "./locator";

export default class PlayerInputComponent implements IInputComponent {
    protected gameInput: IGameInput;

    public constructor() {
        this.gameInput = Locator.getGameInput();
    }

    public update(player: IPlayer): void {
        if (this.gameInput.pressed.player1.left) {
            player.goLeft();
        }

        if (this.gameInput.pressed.player1.up) {
            player.goUp();
        }

        if (this.gameInput.pressed.player1.right) {
            player.goRight();
        }

        if (this.gameInput.pressed.player1.down) {
            player.goDown();
        }
    }
}