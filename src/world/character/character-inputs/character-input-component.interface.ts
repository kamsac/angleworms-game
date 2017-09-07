import Character from '../character.interface';

interface CharacterInputComponent {
    update: (character: Character) => void;
}

export default CharacterInputComponent;
