import GameConfiguration from './game-configuration';

export default class Time {
    public static secondsToTicks(seconds: number): number {
        return seconds * GameConfiguration.TICKS_PER_SECOND;
    }

    public static ticksToSeconds(ticks: number): number {
        return ticks / GameConfiguration.TICKS_PER_SECOND;
    }

    public static squaresPerSecondsToTicks(speed: number): number {
        return GameConfiguration.TICKS_PER_SECOND / speed;
    }
}
