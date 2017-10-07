import Renderable from '../renderable.interface';
import Vector2D from '../vector-2d.type';
import WorldPosition from '../world-position.type';
import World from '../world.interface';

interface WorldObject extends Renderable {
    setPosition: (position: WorldPosition) => void;
    getPosition: () => WorldPosition;
    getWorld: () => World;
    setSpeed: (speed: number) => void;
    getSpeed: () => number;
    setDirection: (direction: Vector2D) => void;
    getDirection: () => Vector2D;
    getVelocity: () => Vector2D;
    stop: () => void;
    getTicksSinceMoved: () => Vector2D;
    getType: () => string;
    move: (velocity: Vector2D) => void;
    removeItself: () => void;
    update: () => void;
}

export default WorldObject;
