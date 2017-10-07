import Character from '../character.interface';

interface CharacterDeathComponent {
    die: (character: Character) => void;
    update: () => void;
}

export default CharacterDeathComponent;
