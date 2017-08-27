import Locator from '../../../locator';
import WorldPosition from '../../world-position.type';
import World from '../../world.interface';
import Player from '../player.interface';
import PlayerCollisionDetectorComponent from './player-collision-detector-component.interface';

export default class ClassicSnakeCollisionDetectorComponent implements PlayerCollisionDetectorComponent {
    private world: World;

    public constructor() {
        this.world = Locator.getWorld();
    }

    public isSafeToGoLeft(player: Player): boolean {
        const nextPosition: WorldPosition = {
            x: player.getHead().getPosition().x - 1,
            y: player.getHead().getPosition().y,
        };

        return (this.world.getWorldItemsAt(nextPosition).length === 0);
    }

    public isSafeToGoUp(player: Player): boolean {
        const nextPosition: WorldPosition = {
            x: player.getHead().getPosition().x,
            y: player.getHead().getPosition().y - 1,
        };

        return (this.world.getWorldItemsAt(nextPosition).length === 0);
    }

    public isSafeToGoRight(player: Player): boolean {
        const nextPosition: WorldPosition = {
            x: player.getHead().getPosition().x + 1,
            y: player.getHead().getPosition().y,
        };

        return (this.world.getWorldItemsAt(nextPosition).length === 0);
    }

    public isSafeToGoDown(player: Player): boolean {
        const nextPosition: WorldPosition = {
            x: player.getHead().getPosition().x,
            y: player.getHead().getPosition().y + 1,
        };

        return (this.world.getWorldItemsAt(nextPosition).length === 0);
    }

    public isSafeNotToChangeDirection(player: Player): boolean {
        const nextPosition: WorldPosition = {
            x: player.getHead().getPosition().x + player.getVelocity().x,
            y: player.getHead().getPosition().y + player.getVelocity().y,
        };

        return (this.world.getWorldItemsAt(nextPosition).length === 0);
    }
}
