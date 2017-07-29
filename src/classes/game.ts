import Map from '../interfaces/map.interface';
import Dimensions from '../types/dimensions.type';
import PlayerInitialSettings from '../types/player-initial-settings.type';
import CanvasImpl from './canvas';
import GameInput from './game-input';
import Locator from './locator';
import MapImpl from './map';
import PlayerImpl from './player';
import PlayerAiInputComponent from './player-ai-input-component';
import PlayerCheatInputComponent from './player-cheat-input-component';
import Stats = require('stats.js');
import ClassicSnakeCollisionDetectorComponent from './classic-snake-collision-detector';

export default class Game {
    private map: Map;
    private players: PlayerImpl[];
    private fps: number;
    private tickTime: number; // ms
    private lastTime: number; // ms
    private deltaTime: number; // ms
    private updateLag: number; // ms
    private maxUpdateLag: number; // ms
    private fpsStats: Stats;

    public constructor() {
        Game.provideServices();

        this.map = Locator.getMap();
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
        Locator.provideCanvas(new CanvasImpl());
        Locator.provideMap(new MapImpl({width: 20, height: 20}));
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
        this.initPlayers();
    }

    private update(): void {
        for (const player of this.players) {
            player.update();
        }
    }

    private render(): void {
        this.map.draw();
        for (const player of this.players) {
            player.draw();
        }
    }

    private initPlayers(): void {
        const mapSize: Dimensions = this.map.getSize();
        const player1Settings: PlayerInitialSettings = {
            color: '#8f0',
            position: {x: Math.floor(2), y: Math.floor(mapSize.height / 2)},
            velocity: {x: 1, y: 0},
        };
        const player2Settings: PlayerInitialSettings = {
            color: '#08f',
            position: {x: Math.floor(mapSize.width - 2), y: Math.floor(mapSize.height / 2)},
            velocity: {x: -1, y: 0},
        };

        this.players.push(
            new PlayerImpl(
                player1Settings,
                new PlayerCheatInputComponent(),
                new ClassicSnakeCollisionDetectorComponent(),
            ),
        );
        this.players.push(
            new PlayerImpl(
                player2Settings,
                new PlayerAiInputComponent(),
                new ClassicSnakeCollisionDetectorComponent(),
            ),
        );
    }

    private initFpsStats(): void {
        this.fpsStats = new Stats();
        this.fpsStats.showPanel(0);
        document.body.appendChild(this.fpsStats.dom);
    }
}
