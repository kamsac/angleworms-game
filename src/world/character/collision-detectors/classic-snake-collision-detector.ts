import Locator from '../../../locator';
import WorldPosition from '../../world-position.type';
import World from '../../world.interface';
import Character from '../character.interface';
import CharacterCollisionDetectorComponent from './character-collision-detector-component.interface';

export default class ClassicSnakeCollisionDetectorComponent implements CharacterCollisionDetectorComponent {
    private world: World;
    private dangerousWorldItems: string[];

    public constructor() {
        this.world = Locator.getWorld();
        this.dangerousWorldItems = [
            'character-head',
            'character-tail',
            'wall',
        ];
    }

    public isSafeToGoLeft(character: Character): boolean {
        const nextPosition: WorldPosition = {
            x: character.getHead().getPosition().x - 1,
            y: character.getHead().getPosition().y,
        };

        return (this.world.getWorldItemsAt(nextPosition, this.dangerousWorldItems).length === 0);
    }

    public isSafeToGoUp(character: Character): boolean {
        const nextPosition: WorldPosition = {
            x: character.getHead().getPosition().x,
            y: character.getHead().getPosition().y - 1,
        };

        return (this.world.getWorldItemsAt(nextPosition, this.dangerousWorldItems).length === 0);
    }

    public isSafeToGoRight(character: Character): boolean {
        const nextPosition: WorldPosition = {
            x: character.getHead().getPosition().x + 1,
            y: character.getHead().getPosition().y,
        };

        return (this.world.getWorldItemsAt(nextPosition, this.dangerousWorldItems).length === 0);
    }

    public isSafeToGoDown(character: Character): boolean {
        const nextPosition: WorldPosition = {
            x: character.getHead().getPosition().x,
            y: character.getHead().getPosition().y + 1,
        };

        return (this.world.getWorldItemsAt(nextPosition, this.dangerousWorldItems).length === 0);
    }

    public isSafeNotToChangeDirection(character: Character): boolean {
        const nextPosition: WorldPosition = {
            x: character.getHead().getPosition().x + character.getVelocity().x,
            y: character.getHead().getPosition().y + character.getVelocity().y,
        };

        return (this.world.getWorldItemsAt(nextPosition, this.dangerousWorldItems).length === 0);
    }
}
