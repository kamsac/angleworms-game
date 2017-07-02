import IInputComponent from "../interfaces/input-component.interface";
import IPlayer from "../interfaces/player.interface";
import PlayerInputBindings from "../types/player-input-bindings.type";

export default class PlayerInputComponent implements IInputComponent {
    private bindings: PlayerInputBindings;

    public constructor() {
        this.initBindings();
    }

    public init(player: IPlayer): void {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            let key: string = event.key;
            switch(key) {
                case this.bindings.left:
                    player.goLeft();
                    break;
                case this.bindings.up:
                    player.goUp();
                    break;
                case this.bindings.right:
                    player.goRight();
                    break;
                case this.bindings.down:
                    player.goDown();
                    break;
            }
        }, false);
    }

    public update(player: IPlayer): void {

    }

    private initBindings(): void {
        this.bindings = {
            left: 'ArrowLeft',
            up: 'ArrowUp',
            right: 'ArrowRight',
            down: 'ArrowDown',
        }
    }
}