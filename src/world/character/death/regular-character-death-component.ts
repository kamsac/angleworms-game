import Character from '../character.interface';
import CharacterDeathComponent from './character-death-component.interface';

export default class RegularCharacterDeathComponent implements CharacterDeathComponent {
    public die(character: Character): void {
        character.getWorld().getRound().start();
    }
}
