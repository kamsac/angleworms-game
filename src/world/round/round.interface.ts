import World from '../world.interface';

interface Round {
    start: () => void;
    update: () => void;
    getWorld: () => World;
    stopAllCharacters: () => void;
    getStartTime: () => number;
}

export default Round;
