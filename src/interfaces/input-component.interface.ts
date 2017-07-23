import IPlayer from './player.interface';

interface IInputComponent {
    update: (player: IPlayer) => void;
}

export default IInputComponent;