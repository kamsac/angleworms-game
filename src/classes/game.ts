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
    private readonly fps: number;
    private map: IMap;
    private players: Player[];

    constructor() {
        Game.provideServices();

        this.fps = 1000 / 10;
        this.map = Locator.getMap();
        this.players = [];

        this.init();
        setInterval(() => { this.gameLoop() }, this.fps);
    }

    private static provideServices(): void {
        Locator.provideCanvas(new Canvas());
        Locator.provideMap(new Map({width: 20, height: 20}));
    }

    private gameLoop(): void {
        this.update();
        this.draw();
    };

    private init(): void {
        this.initPlayers();
    }

    private update(): void {
        for(let i = 0; i < this.players.length; i++) {
            this.players[i].update();
        }
    }

    private draw(): void {
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