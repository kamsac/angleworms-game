import Map from '../interfaces/map.interface';
import PlayerCollisionDetectorComponent from '../interfaces/player-collision-detector-component.interface';
import Player from '../interfaces/player.interface';
import MapPosition from '../types/map-position.type';
import Locator from './locator';

export default class AnglewormsCollisionDetectorComponent implements PlayerCollisionDetectorComponent {
    private map: Map;

    public constructor() {
        this.map = Locator.getMap();
    }

    public isSafeToGoLeft(player: Player): boolean {
        const nextPosition: MapPosition = {
            x: player.getHead().getPosition().x - 2,
            y: player.getHead().getPosition().y,
        };

        return (this.map.getMapItemsAt(nextPosition).length === 0);
    }

    public isSafeToGoUp(player: Player): boolean {
        const nextPosition: MapPosition = {
            x: player.getHead().getPosition().x,
            y: player.getHead().getPosition().y - 2,
        };

        return (this.map.getMapItemsAt(nextPosition).length === 0);
    }

    public isSafeToGoRight(player: Player): boolean {
        const nextPosition: MapPosition = {
            x: player.getHead().getPosition().x + 2,
            y: player.getHead().getPosition().y,
        };

        return (this.map.getMapItemsAt(nextPosition).length === 0);
    }

    public isSafeToGoDown(player: Player): boolean {
        const nextPosition: MapPosition = {
            x: player.getHead().getPosition().x,
            y: player.getHead().getPosition().y + 2,
        };

        return (this.map.getMapItemsAt(nextPosition).length === 0);
    }

    public isSafeNotToChangeDirection(player: Player): boolean {
        const nextPosition: MapPosition = {
            x: player.getHead().getPosition().x + 2 * player.getVelocity().x,
            y: player.getHead().getPosition().y + 2 * player.getVelocity().y,
        };

        return (this.map.getMapItemsAt(nextPosition).length === 0);
    }
}
