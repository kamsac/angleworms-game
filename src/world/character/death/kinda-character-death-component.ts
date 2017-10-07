import Character from '../character.interface';
import CharacterDeathComponent from './character-death-component.interface';

export default class KindaCharacterDeathComponent implements CharacterDeathComponent {
    public die(character: Character): void {
        character.setSize(0);
        character.removeDeadTail();
    }
}
