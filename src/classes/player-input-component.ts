import IInputComponent from "../interfaces/input-component.interface";
import IPlayer from "../interfaces/player.interface";
import PlayerInputBindings from "../types/player-input-bindings.type";

export default class PlayerInputComponent implements IInputComponent {
    private bindings: PlayerInputBindings;

    public constructor() {
        this.initBindings();
    }

    public init(player: IPlayer) {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            let key: string = event.key;
            switch(key) {
                case this.bindings.left:
                    player.setVelocity({x: -1, y: 0});
                    break;
                case this.bindings.up:
                    player.setVelocity({x: 0, y: -1});
                    break;
                case this.bindings.right:
                    player.setVelocity({x: 1, y: 0});
                    break;
                case this.bindings.down:
                    player.setVelocity({x: 0, y: 1});
                    break;
            }
        }, false);
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