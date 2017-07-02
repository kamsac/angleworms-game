import Map from "./map";
import Player from "./player";
import Locator from "./locator";
import IMap from "../interfaces/map.interface";
import Canvas from "./canvas";
import PlayerCheatInputComponent from "./player-cheat-input-component";
import PlayerAiInputComponent from "./player-ai-input-component";

export default class Game {
    private readonly fps: number;
    private map: IMap;
    private player: Player;

    constructor() {
        Game.provideServices();

        this.fps = 1000 / 10;
        this.map = Locator.getMap();
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
        this.initPlayer();
    }

    private update(): void {
        this.player.update();
    }

    private draw(): void {
        this.map.draw();
        this.player.draw();
    }

    private initPlayer(): void {
        this.player = new Player(new PlayerAiInputComponent());
    }
}