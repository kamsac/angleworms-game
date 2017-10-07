import Locator from '../../locator';
import GameRenderer from '../../renderers/game-renderer.interface';
import CharacterBuilder from '../character/character-builder';
import Character from '../character/character.interface';
import Dimensions from '../dimensions.type';
import WorldImpl from '../world';
import WallSpawner from '../world-object/wall-spawner';
import World from '../world.interface';
import Round from './round.interface';

export default class RoundImpl implements Round {
    private world: World;
    private characters: Character[];
    private renderer: GameRenderer;

    public constructor() {
        this.renderer = Locator.getGameRenderer();
    }

    public start(): void {
        this.initWorld();
        this.initCharacters();
        this.initWalls();
        this.initApples();
        this.initRenderer();
    }

    public update(): void {
        for (const character of this.characters) {
            character.update();
        }

        this.world.update();
    }

    public getWorld(): World {
        return this.world;
    }

    private initWorld(): void {
        const worldSize: Dimensions = {
            width: 40,
            height: 40,
        };
        this.world = new WorldImpl(worldSize, this);
        this.world.reset();
    }

    private initCharacters(): void {
        this.characters = [];

        const player1Character: Character = new CharacterBuilder()
            .setRepresentation('green')
            .setWorld(this.world)
            .setStartingPosition('left')
            .setStartingDirection('right')
            .setSpeed(15)
            .setInputMethod('player1')
            .setTailManager('angleworms')
            .setCollisionStyle('classic')
            .setGun('angleworms')
            .build();

        const aiCharacter: Character = new CharacterBuilder()
            .setRepresentation('blue')
            .setWorld(this.world)
            .setStartingPosition('right')
            .setStartingDirection('left')
            .setSpeed(15)
            .setInputMethod('ai')
            .setTailManager('angleworms')
            .setCollisionStyle('classic')
            .setGun('angleworms')
            .build();

        this.characters.push(player1Character);
        this.characters.push(aiCharacter);
    }

    private initWalls(): void {
        new WallSpawner(this.world)
            .spawnRandomRectanglesWalls()
            .removeWallsOnCharactersWay(this.characters)
            .spawnBorderWalls();
    }

    private initApples(): void {
        this.world.spawnApple();
        this.world.spawnApple();
    }

    private initRenderer(): void {
        this.renderer.setWorldRenderer(this.world);
    }
}
