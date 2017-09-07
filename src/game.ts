import GameInput from './game-input/game-input';
import Locator from './locator';
import WorldImpl from './world/world';
import World from './world/world.interface';
import Stats = require('stats.js');
import GameCanvasRenderer from './renderers/canvas/game-canvas-renderer';
import PlayerBuilder from './world/player/player-builder';
import Player from './world/player/player.interface';

export default class Game {
    private world: World;
    private players: Player[];
    private fps: number;
    private tickTime: number; // ms
    private lastTime: number; // ms
    private deltaTime: number; // ms
    private updateLag: number; // ms
    private maxUpdateLag: number; // ms
    private fpsStats: Stats;
    private renderer: GameCanvasRenderer;

    public constructor() {
        Game.provideServices();

        this.world = Locator.getWorld();
        this.players = [];
        this.fps = 120;
        this.tickTime = 1000 / this.fps;
        this.lastTime = 0;
        this.deltaTime = 0;
        this.updateLag = 0;
        this.maxUpdateLag = 500;

        this.init();
        this.requestNextFrame();
    }

    private static provideServices(): void {
        Locator.provideWorld(new WorldImpl({width: 20, height: 20}));
        Locator.provideGameInput(new GameInput());
        Locator.provideGameResolution({width: 400, height: 400});
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
        this.initRenderer();
        this.initPlayers();
    }

    private update(): void {
        for (const player of this.players) {
            player.update();
        }
    }

    private render(): void {
        this.renderer.render();
    }

    private initPlayers(): void {
        const player1: Player = new PlayerBuilder()
            .setRepresentation('green')
            .setStartingPosition('left')
            .setStartingDirection('right')
            .setInputMethod('player1')
            .setCollisionStyle('classic')
            .build();

        const player2: Player = new PlayerBuilder()
            .setRepresentation('blue')
            .setStartingPosition('right')
            .setStartingDirection('left')
            .setInputMethod('ai')
            .setCollisionStyle('classic')
            .build();

        this.players.push(player1);
        this.players.push(player2);
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
