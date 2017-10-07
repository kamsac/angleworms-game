import WorldPositionHelper from '../../world-position-helper';
import WorldPosition from '../../world-position.type';
import Character from '../character.interface';
import CharacterCollisionDetectorComponent from './character-collision-detector-component.interface';

export default class AnglewormsCollisionDetectorComponent implements CharacterCollisionDetectorComponent {
    private dangerousWorldObjects: string[];

    public constructor() {
        this.dangerousWorldObjects = [
            'character-head',
            'character-tail',
            'wall',
            'apple',
        ];
    }

    public isSafeToGoLeft(character: Character): boolean {
        const nextPosition: WorldPosition = {
            x: character.getHead().getPosition().x - 2,
            y: character.getHead().getPosition().y,
        };

        return (character.getWorld().getWorldObjectsAt(nextPosition, this.dangerousWorldObjects).length === 0);
    }

    public isSafeToGoUp(character: Character): boolean {
        const nextPosition: WorldPosition = {
            x: character.getHead().getPosition().x,
            y: character.getHead().getPosition().y - 2,
        };

        return (character.getWorld().getWorldObjectsAt(nextPosition, this.dangerousWorldObjects).length === 0);
    }

    public isSafeToGoRight(character: Character): boolean {
        const nextPosition: WorldPosition = {
            x: character.getHead().getPosition().x + 2,
            y: character.getHead().getPosition().y,
        };

        return (character.getWorld().getWorldObjectsAt(nextPosition, this.dangerousWorldObjects).length === 0);
    }

    public isSafeToGoDown(character: Character): boolean {
        const nextPosition: WorldPosition = {
            x: character.getHead().getPosition().x,
            y: character.getHead().getPosition().y + 2,
        };

        return (character.getWorld().getWorldObjectsAt(nextPosition, this.dangerousWorldObjects).length === 0);
    }

    public isSafeNotToChangeDirection(character: Character): boolean {
        const nextPosition: WorldPosition = WorldPositionHelper.getAdjacentFuturePosition(
            character.getHead().getPosition(),
            character.getHead().getVelocity(),
            2,
        );

        return (character.getWorld().getWorldObjectsAt(nextPosition, this.dangerousWorldObjects).length === 0);
    }
}
