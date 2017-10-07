import Stats = require('stats.js');
import GameConfiguration from './game-configuration';
import GameInput from './game-input/game-input';
import Locator from './locator';
import GameCanvasRenderer from './renderers/canvas/game-canvas-renderer';
import RoundImpl from './world/round/round';
import Round from './world/round/round.interface';
import WorldImpl from './world/world';
import World from './world/world.interface';

export default class Game {
    private world: World;
    private fps: number;
    private tickTime: number; // ms
    private lastTime: number; // ms
    private deltaTime: number; // ms
    private updateLag: number; // ms
    private maxUpdateLag: number; // ms
    private fpsStats: Stats;
    private renderer: GameCanvasRenderer;
    private round: Round;

    public constructor() {
        Game.provideServices();

        this.world = Locator.getWorld();
        this.fps = GameConfiguration.TICKS_PER_SECOND;
        this.tickTime = 1000 / this.fps;
        this.lastTime = 0;
        this.deltaTime = 0;
        this.updateLag = 0;
        this.maxUpdateLag = 500;

        this.init();
        this.requestNextFrame();
    }

    private static provideServices(): void {
        Locator.provideWorld(new WorldImpl({width: 40, height: 40}));
        Locator.provideGameInput(new GameInput());
    }

    private requestNextFrame(): void {
        window.requestAnimationFrame((timestamp: number) => { this.gameLoop(timestamp); });
    }

    private gameLoop(time: number /* ms */): void {
        this.fpsStats.begin();
        this.deltaTime = Math.min(this.maxUpdateLag, time - this.lastTime);
        this.updateLag += this.deltaTime;

        while (this.updateLag > this.tickTime) {
            this.updateLag -= this.tickTime;
            this.update();
        }
        this.render();
        this.lastTime = time;
        this.fpsStats.end();
        this.requestNextFrame();
    }

    private init(): void {
        this.initFpsStats();
        this.initRound();
        this.initRenderer();
    }

    private update(): void {
        this.round.update();
    }

    private render(): void {
        this.renderer.render();
    }

    private initRound(): void {
        this.round = new RoundImpl();
        this.round.start();
    }

    private initFpsStats(): void {
        this.fpsStats = new Stats();
        this.fpsStats.showPanel(0);
        document.body.appendChild(this.fpsStats.dom);
    }

    private initRenderer(): void {
        this.renderer = new GameCanvasRenderer(this.world);
    }
}
