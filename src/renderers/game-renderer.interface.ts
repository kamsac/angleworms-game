import World from '../world/world.interface';

interface GameRenderer {
    render: () => void;
    setWorldRenderer: (world: World) => void;
}

export default GameRenderer;
