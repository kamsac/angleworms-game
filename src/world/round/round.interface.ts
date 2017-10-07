import World from '../world.interface';

interface Round {
    start: () => void;
    update: () => void;
    getWorld: () => World;
    stopAllCharacters: () => void;
}

export default Round;
