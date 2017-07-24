import IPlayer from './player.interface';

interface IPlayerCollisionDetectorComponent {
    isSafeToGoLeft: (player: IPlayer) => boolean;
    isSafeToGoUp: (player: IPlayer) => boolean;
    isSafeToGoRight: (player: IPlayer) => boolean;
    isSafeToGoDown: (player: IPlayer) => boolean;
    isSafeNotToChangeDirection: (player: IPlayer) => boolean;
}

export default IPlayerCollisionDetectorComponent;
