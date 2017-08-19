import GameInput from '../../../game-input/game-input.interface';
import Locator from '../../../locator';
import Player from '../player.interface';
import InputComponent from './input-component.interface';

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
