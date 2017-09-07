import Player from '../player.interface';

interface PlayerInputComponent {
    update: (player: Player) => void;
}

export default PlayerInputComponent;
