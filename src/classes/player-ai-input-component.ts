import IInputComponent from "../interfaces/input-component.interface";
import IPlayer from "../interfaces/player.interface";
import IMap from "../interfaces/map.interface";
import Locator from "./locator";
import MapPosition from "../types/map-position.type";

export default class PlayerAiInputComponent implements IInputComponent {

    private map: IMap;

    public constructor() {
        this.map = Locator.getMap();
    }

    public init(player: IPlayer) {

    }

    public update(player: IPlayer) {
        if (player.getTicksToMove() === 0) {
            let safePlayerActions = [];
            if (player.isSafeToGoLeft()) {
                safePlayerActions.push(() => { player.goLeft() });
            }
            if (player.isSafeToGoUp()) {
                safePlayerActions.push(() => { player.goUp() });
            }
            if (player.isSafeToGoRight()) {
                safePlayerActions.push(() => { player.goRight() });
            }
            if (player.isSafeToGoDown()) {
                safePlayerActions.push(() => { player.goDown() });
            }
            const doIHaveAnySafeMoves = () => safePlayerActions.length > 0;
            if (doIHaveAnySafeMoves()) {
                const whichDirectionIWantToGo: number = Math.floor(Math.random() * safePlayerActions.length );
                const go = () => { safePlayerActions[whichDirectionIWantToGo]() };

                if (this.doIfIDieIfIDontChangeDirection(player)) {
                    go();
                } else if (this.doIFeelLikeChangingDirectionForNoGoodReason()) {
                    go();
                }
            }
        }
    }

    private doIfIDieIfIDontChangeDirection(me: IPlayer): boolean {
        const futurePosition: MapPosition = {
            x: me.getHead().getPosition().x + me.getVelocity().x,
            y: me.getHead().getPosition().y + me.getVelocity().y
        };
        const isSafe = (this.map.getMapItemsAt(futurePosition).length === 0);
        return !isSafe;
    }

    private doIFeelLikeChangingDirectionForNoGoodReason(): boolean {
        return (Math.random() < 0.2);
    }
}