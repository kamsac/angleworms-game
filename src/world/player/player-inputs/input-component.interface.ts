import Player from '../player.interface';

interface InputComponent {
    update: (player: Player) => void;
}

export default InputComponent;
