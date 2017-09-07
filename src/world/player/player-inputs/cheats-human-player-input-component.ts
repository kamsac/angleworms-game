import Player from '../player.interface';
import PlayerInputComponent from './human-player-input-component';

export default class CheatsHumanPlayerInputComponent extends PlayerInputComponent {

    public constructor() {
        super();
    }

    public update(player: Player): void {
        super.update(player);

        if (this.gameInput.bindings.player1.cheatGrow.isPressed) {
            player.setSize(player.getSize() + 1);
        }

        if (this.gameInput.bindings.player1.cheatShrink.isPressed) {
            if (player.getSize() > 0) {
                player.setSize(player.getSize() - 1);
            }
        }
    }
}
