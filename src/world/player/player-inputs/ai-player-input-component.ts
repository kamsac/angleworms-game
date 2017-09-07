import Locator from '../../../locator';
import World from '../../world.interface';
import Player from '../player.interface';
import PlayerInputComponent from './player-input-component.interface';

export default class AiPlayerInputComponent implements PlayerInputComponent {

    private world: World;

    public constructor() {
        this.world = Locator.getWorld();
    }

    public update(player: Player) {
        if (player.getTicksToMove() === 0) {
            const safePlayerActions = [];
            if (player.isSafeToGoLeft()) {
                safePlayerActions.push(() => { player.goLeft(); });
            }
            if (player.isSafeToGoUp()) {
                safePlayerActions.push(() => { player.goUp(); });
            }
            if (player.isSafeToGoRight()) {
                safePlayerActions.push(() => { player.goRight(); });
            }
            if (player.isSafeToGoDown()) {
                safePlayerActions.push(() => { player.goDown(); });
            }
            const doIHaveAnySafeMoves = () => safePlayerActions.length > 0;
            if (doIHaveAnySafeMoves()) {
                const whichDirectionIWantToGo: number = Math.floor(Math.random() * safePlayerActions.length );
                const goChangeDirection = () => { safePlayerActions[whichDirectionIWantToGo](); };

                if (!player.isSafeNotToChangeDirection() || this.doIFeelLikeChangingDirectionForNoGoodReason()) {
                    goChangeDirection();
                }
            }
        }
    }

    private doIFeelLikeChangingDirectionForNoGoodReason(): boolean {
        return (Math.random() < 0.2);
    }
}
