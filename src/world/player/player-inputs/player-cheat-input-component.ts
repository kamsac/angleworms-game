import Player from '../player.interface';
import PlayerInputComponent from './player-input-component';

export default class PlayerCheatInputComponent extends PlayerInputComponent {

    public constructor() {
        super();
    }

    public update(player: Player): void {
        super.update(player);

        if (this.gameInput.pressed.player1.cheatGrow) {
            player.setSize(player.getSize() + 1);
        }

        if (this.gameInput.pressed.player1.cheatShrink) {
            if (player.getSize() > 0) {
                player.setSize(player.getSize() - 1);
            }
        }
    }
}
