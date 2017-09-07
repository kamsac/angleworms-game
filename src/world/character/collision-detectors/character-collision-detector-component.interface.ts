import Character from '../character.interface';

interface CharacterCollisionDetectorComponent {
    isSafeToGoLeft: (character: Character) => boolean;
    isSafeToGoUp: (character: Character) => boolean;
    isSafeToGoRight: (character: Character) => boolean;
    isSafeToGoDown: (character: Character) => boolean;
    isSafeNotToChangeDirection: (character: Character) => boolean;
}

export default CharacterCollisionDetectorComponent;
