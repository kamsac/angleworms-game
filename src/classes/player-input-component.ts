import GameInput from '../interfaces/game-input.interface';
import InputComponent from '../interfaces/input-component.interface';
import Player from '../interfaces/player.interface';
import Locator from './locator';

export default class PlayerInputComponent implements InputComponent {
    protected gameInput: GameInput;

    public constructor() {
        this.gameInput = Locator.getGameInput();
    }

    public update(player: Player): void {
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
