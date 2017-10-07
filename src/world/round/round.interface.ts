import World from '../world.interface';

interface Round {
    start: () => void;
    update: () => void;
    getWorld: () => World;
}

export default Round;
