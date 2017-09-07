import Character from '../character.interface';
import CharacterInputComponent from './player-character-input-component';

export default class CheatsPlayerCharacterInputComponent extends CharacterInputComponent {

    public constructor() {
        super();
    }

    public update(character: Character): void {
        super.update(character);

        if (this.gameInput.bindings.player1.cheatGrow.isPressed) {
            character.setSize(character.getSize() + 1);
        }

        if (this.gameInput.bindings.player1.cheatShrink.isPressed) {
            if (character.getSize() > 0) {
                character.setSize(character.getSize() - 1);
            }
        }
    }
}
