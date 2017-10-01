import GameConfiguration from '../game-configuration';
import Velocity from './velocity.type';

export default class VelocityHelper {
    public static speedToTicks(speed: number): number {
        return Math.abs(GameConfiguration.TICKS_PER_SECOND / speed);
    }

    public static ticksToVelocity(ticks: number): number {
        return Math.abs(ticks / GameConfiguration.TICKS_PER_SECOND);
    }

    public static fasten(velocity: Velocity, speed: number): Velocity {
        const absX: number = Math.abs(velocity.x);
        const absY: number = Math.abs(velocity.y);
        const max: number = Math.max(absX, absY);
        const min: number = Math.min(absX, absY);
        const sum: number = max + min;
        const xPower: number = absX / sum;
        const yPower: number = absY / sum;
        const negateX: number = (velocity.x < 0) ? -1 : 1;
        const negateY: number = (velocity.y < 0) ? -1 : 1;

        return {
            x: velocity.x + (speed * xPower * negateX),
            y: velocity.y + (speed * yPower * negateY),
        };
    }
}
