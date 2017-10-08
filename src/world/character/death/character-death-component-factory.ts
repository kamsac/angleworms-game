import AnglewormsCharacterDeathComponent from './angleworms-character-death-component';
import CharacterDeathComponent from './character-death-component.interface';
import DeathStyle from './death-style.type';
import KindaCharacterDeathComponent from './kinda-character-death-component';
import RegularCharacterDeathComponent from './regular-character-death-component';

export default class CharacterDeathComponentFactory {
    public static create(deathStyle: DeathStyle): CharacterDeathComponent {
        switch (deathStyle) {
            case 'angleworms':
                return new AnglewormsCharacterDeathComponent();
            case 'regular':
                return new RegularCharacterDeathComponent();
            case 'kinda':
                return new KindaCharacterDeathComponent();
            default:
                throw Error(`Wrong \`${deathStyle}\` death style!`);
        }
    }
}
