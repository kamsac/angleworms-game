import Map from "./map";
import Player from "./player";
import Locator from "./locator";
import IMap from "../interfaces/map.interface";
import Canvas from "./canvas";
import PlayerCheatInputComponent from "./player-cheat-input-component";
import PlayerAiInputComponent from "./player-ai-input-component";
import PlayerInitialSettings from "../types/player-initial-settings.type";
import Dimensions from "../types/dimensions.type";

export default class Game {
    private map: IMap;
    private players: Player[];
    private fps: number;
    private stepTime: number; // ms
    private lastTime: number; // ms
    private deltaTime: number; // ms
    private updateLag: number; // ms
    private maxUpdateLag: number; // ms

    constructor() {
        Game.provideServices();

        this.map = Locator.getMap();
        this.players = [];
        this.fps = 10;
        this.stepTime = 1000 / this.fps;
        this.lastTime = 0;
        this.deltaTime = 0;
        this.updateLag = 0;
        this.maxUpdateLag = 500;

        this.init();
        this.requestNextFrame();
    }

    private requestNextFrame(): void {
        window.requestAnimationFrame((timestamp) => { this.gameLoop(timestamp) });
    }

    private static provideServices(): void {
        Locator.provideCanvas(new Canvas());
        Locator.provideMap(new Map({width: 20, height: 20}));
    }

    private gameLoop(time: number /* ms */): void {
        this.deltaTime = Math.min(this.maxUpdateLag, time - this.lastTime);
        this.updateLag += this.deltaTime;

        while (this.updateLag > this.stepTime) {
            this.updateLag -= this.stepTime;
            this.update();
        }
        this.render();
        this.lastTime = time;
        this.requestNextFrame();
    };

    private init(): void {
        this.initPlayers();
    }

    private update(): void {
        for(let i = 0; i < this.players.length; i++) {
            this.players[i].update();
        }
    }

    private render(): void {
        this.map.draw();
        for(let i = 0; i < this.players.length; i++) {
            this.players[i].draw();
        }
    }

    private initPlayers(): void {
        const mapSize: Dimensions = this.map.getSize();
        const player1Settings: PlayerInitialSettings = {
            color: '#8f0',
            position: {x: Math.floor(2), y: Math.floor(mapSize.height / 2)},
            velocity: {x: 1, y: 0}
        };
        const player2Settings: PlayerInitialSettings = {
            color: '#08f',
            position: {x: Math.floor(mapSize.width - 2), y: Math.floor(mapSize.height / 2)},
            velocity: {x: -1, y: 0}
        };

        this.players.push(new Player(player1Settings, new PlayerCheatInputComponent()));
        this.players.push(new Player(player2Settings, new PlayerAiInputComponent()));
    }
}