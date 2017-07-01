import PlayerCheatInputBindings from "./player-cheat-input-bindings.type";

type PlayerInputBindings = {
    left: string;
    up: string;
    right: string;
    down: string;
    cheat: PlayerCheatInputBindings;
}

export default PlayerInputBindings;