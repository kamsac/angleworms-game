import PlayerInputComponent from "./player-input-component";
import PlayerCheatInputBindings from "../types/player-cheat-input-bindings.type";
import IPlayer from "../interfaces/player.interface";

export default class PlayerCheatInputComponent extends PlayerInputComponent {
    private cheatBindings: PlayerCheatInputBindings;

    public constructor() {
        super();
        this.initCheatBindings();
    }

    public init(player: IPlayer) {
        super.init(player);

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            let key: string = event.key;
            switch(key) {
                case this.cheatBindings.growTail:
                    player.setSize(player.getSize() + 1);
                    break;
                case this.cheatBindings.shrinkTail:
                    if (player.getSize() > 0) {
                        player.setSize(player.getSize() - 1);
                    }
                    break;
            }
        }, false);
    }

    private initCheatBindings(): void {
        this.cheatBindings = {
            growTail: '1',
            shrinkTail: '2'
        }
    }
}