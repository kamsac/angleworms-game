import Character from '../character.interface';

interface CharacterDeathComponent {
    die: (character: Character) => void;
}

export default CharacterDeathComponent;
