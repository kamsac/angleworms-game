import Locator from '../../../locator';
import MapPosition from '../../map/map-position.type';
import Map from '../../map/map.interface';
import Player from '../player.interface';
import PlayerCollisionDetectorComponent from './player-collision-detector-component.interface';

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
