import GameConfiguration from './game-configuration';

export default class Time {
    public static secondsToTicks(speed: number): number {
        return GameConfiguration.TICKS_PER_SECOND / speed;
    }

    public static ticksToSeconds(ticks: number): number {
        return ticks / GameConfiguration.TICKS_PER_SECOND;
    }
}
