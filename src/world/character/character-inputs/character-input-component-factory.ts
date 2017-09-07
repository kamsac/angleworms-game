import AiCharacterInputComponent from './ai-character-input-component';
import CharacterInputComponent from './character-input-component.interface';
import CharacterInputMethod from './character-input-method.type';
import CheatsHumanCharacterInputComponent from './cheats-player-character-input-component';
import HumanCharacterInputComponent from './player-character-input-component';

export default class CharacterInputComponentFactory {
    public static create(characterInputComponentName: CharacterInputMethod): CharacterInputComponent {
        switch (characterInputComponentName) {
            case 'player1':
                return new HumanCharacterInputComponent();
            case 'player1-cheats':
                return new CheatsHumanCharacterInputComponent();
            case 'ai':
                return new AiCharacterInputComponent();
            default:
                throw new Error(
                    `Can't make \`${characterInputComponentName}\` InputComponent, but probably should!`);
        }
    }
}
