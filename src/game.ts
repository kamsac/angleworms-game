import Stats = require('stats.js');
import GameInput from './game-input/game-input';
import Locator from './locator';
import GameCanvasRenderer from './renderers/canvas/game-canvas-renderer';
import CharacterBuilder from './world/character/character-builder';
import Character from './world/character/character.interface';
import WorldImpl from './world/world';
import World from './world/world.interface';

export default class Game {
    private world: World;
    private characters: Character[];
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
        this.characters = [];
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
        this.initCharacters();
    }

    private update(): void {
        for (const character of this.characters) {
            character.update();
        }
    }

    private render(): void {
        this.renderer.render();
    }

    private initCharacters(): void {
        const player1Character: Character = new CharacterBuilder()
            .setRepresentation('green')
            .setStartingPosition('left')
            .setStartingDirection('right')
            .setInputMethod('player1')
            .setCollisionStyle('angleworms')
            .build();

        const aiCharacter: Character = new CharacterBuilder()
            .setRepresentation('blue')
            .setStartingPosition('right')
            .setStartingDirection('left')
            .setInputMethod('ai')
            .setCollisionStyle('angleworms')
            .build();

        this.characters.push(player1Character);
        this.characters.push(aiCharacter);
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
