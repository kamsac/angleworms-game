import Locator from '../../locator';
import CharacterBuilder from '../character/character-builder';
import Character from '../character/character.interface';
import WallSpawner from '../world-object/wall-spawner';
import World from '../world.interface';
import Round from './round.interface';

export default class RoundImpl implements Round {
    private world: World;
    private characters: Character[];

    public start(): void {
        this.initWorld();
        this.initCharacters();
        this.initWalls();
        this.initApples();
    }

    public update(): void {
        for (const character of this.characters) {
            character.update();
        }

        this.world.update();
    }

    private initWorld(): void {
        this.world = Locator.getWorld();
        this.world.reset();
    }

    private initCharacters(): void {
        this.characters = [];

        const player1Character: Character = new CharacterBuilder()
            .setRepresentation('green')
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
}
