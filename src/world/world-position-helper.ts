import Dimensions from './dimensions.type';
import Velocity from './velocity.type';
import WorldPosition from './world-position.type';

export default class WorldPositionHelper {
    public static getAdjacentFuturePosition(
        position: WorldPosition,
        velocity: Velocity,
        times: number = 1,
    ): WorldPosition {
        let adjacentX = 0;
        let adjacentY = 0;
        if (velocity.x < 0) { adjacentX -= times; }
        if (velocity.x > 0) { adjacentX += times; }
        if (velocity.y < 0) { adjacentY -= times; }
        if (velocity.y > 0) { adjacentY += times; }

        return {
            x: position.x + adjacentX,
            y: position.y + adjacentY,
        };
    }

    public static getAdjacentPastPosition(
        position: WorldPosition,
        velocity: Velocity,
        times: number = 1,
    ): WorldPosition {
        let adjacentX = 0;
        let adjacentY = 0;
        if (velocity.x < 0) { adjacentX += times; }
        if (velocity.x > 0) { adjacentX -= times; }
        if (velocity.y < 0) { adjacentY += times; }
        if (velocity.y > 0) { adjacentY -= times; }

        return {
            x: position.x + adjacentX,
            y: position.y + adjacentY,
        };
    }

    public static wrap(position: WorldPosition, worldSize: Dimensions): WorldPosition {
        return {
            x: (worldSize.width + position.x) % worldSize.width,
            y: (worldSize.height + position.y) % worldSize.height,
        };
    }

    public static equal(position1: WorldPosition, position2: WorldPosition): boolean {
        return (
            position1.x === position2.x &&
            position1.y === position2.y
        );
    }

    public static isOutsideWorld(position: WorldPosition, worldSize: Dimensions, margin: number = 0): boolean {
        return (
            position.x < margin || position.x >= worldSize.width - margin ||
            position.y < margin || position.y >= worldSize.height - margin
        );
    }
}
