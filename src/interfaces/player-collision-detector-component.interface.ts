import Player from './player.interface';

interface PlayerCollisionDetectorComponent {
    isSafeToGoLeft: (player: Player) => boolean;
    isSafeToGoUp: (player: Player) => boolean;
    isSafeToGoRight: (player: Player) => boolean;
    isSafeToGoDown: (player: Player) => boolean;
    isSafeNotToChangeDirection: (player: Player) => boolean;
}

export default PlayerCollisionDetectorComponent;
