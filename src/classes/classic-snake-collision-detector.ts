import Map from '../interfaces/map.interface';
import PlayerCollisionDetectorComponent from '../interfaces/player-collision-detector-component.interface';
import Player from '../interfaces/player.interface';
import MapPosition from '../types/map-position.type';
import Locator from './locator';

export default class ClassicSnakeCollisionDetectorComponent implements PlayerCollisionDetectorComponent {
    private map: Map;

    public constructor() {
        this.map = Locator.getMap();
    }

    public isSafeToGoLeft(player: Player): boolean {
        const nextPosition: MapPosition = {
            x: player.getHead().getPosition().x - 1,
            y: player.getHead().getPosition().y,
        };

        return (this.map.getMapItemsAt(nextPosition).length === 0);
    }

    public isSafeToGoUp(player: Player): boolean {
        const nextPosition: MapPosition = {
            x: player.getHead().getPosition().x,
            y: player.getHead().getPosition().y - 1,
        };

        return (this.map.getMapItemsAt(nextPosition).length === 0);
    }

    public isSafeToGoRight(player: Player): boolean {
        const nextPosition: MapPosition = {
            x: player.getHead().getPosition().x + 1,
            y: player.getHead().getPosition().y,
        };

        return (this.map.getMapItemsAt(nextPosition).length === 0);
    }

    public isSafeToGoDown(player: Player): boolean {
        const nextPosition: MapPosition = {
            x: player.getHead().getPosition().x,
            y: player.getHead().getPosition().y + 1,
        };

        return (this.map.getMapItemsAt(nextPosition).length === 0);
    }

    public isSafeNotToChangeDirection(player: Player): boolean {
        const nextPosition: MapPosition = {
            x: player.getHead().getPosition().x + player.getVelocity().x,
            y: player.getHead().getPosition().y + player.getVelocity().y,
        };

        return (this.map.getMapItemsAt(nextPosition).length === 0);
    }
}
