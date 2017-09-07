import AiPlayerInputComponent from './ai-player-input-component';
import CheatsHumanPlayerInputComponent from './cheats-human-player-input-component';
import HumanPlayerInputComponent from './human-player-input-component';
import PlayerInputComponent from './player-input-component.interface';
import PlayerInputMethod from './player-input-method.type';

export default class PlayerInputComponentFactory {
    public static create(playerInputComponentName: PlayerInputMethod): PlayerInputComponent {
        switch (playerInputComponentName) {
            case 'player1':
                return new HumanPlayerInputComponent();
            case 'player1-cheats':
                return new CheatsHumanPlayerInputComponent();
            case 'ai':
                return new AiPlayerInputComponent();
            default:
                throw new Error(
                    `Can't make \`${playerInputComponentName}\` InputComponent, but probably should!`);
        }
    }
}
