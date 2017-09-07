import GameInput from '../../../game-input/game-input.interface';
import InputBindingInformation from '../../../game-input/input-binding-information.type';
import Locator from '../../../locator';
import Player from '../player.interface';
import PlayerInputComponent from './player-input-component.interface';

export default class HumanPlayerInputComponent implements PlayerInputComponent {
    protected gameInput: GameInput;
    private lastPressedDirection: string;

    public constructor() {
        this.gameInput = Locator.getGameInput();
    }

    public update(player: Player): void {
        this.lastPressedDirection = this.getLastPressedDirection();

        switch (this.lastPressedDirection) {
            case 'left': {
                player.goLeft();
                break;
            }
            case 'up': {
                player.goUp();
                break;
            }
            case 'right': {
                player.goRight();
                break;
            }
            case 'down': {
                player.goDown();
                break;
            }
        }
    }

    private getLastPressedDirection(): string {
        const pressedKeys: InputBindingInformation[] = [];
        for (const actionName in this.gameInput.bindings.player1) {
            if (this.gameInput.bindings.player1.hasOwnProperty(actionName)) {
                const bindingInformation: InputBindingInformation = this.gameInput.bindings.player1[actionName];
                if (bindingInformation.isPressed) {
                    pressedKeys.push(this.gameInput.bindings.player1[actionName]);
                }
            }
        }

        if (!pressedKeys.length) {
            return '';
        }

        pressedKeys.sort((binding1: InputBindingInformation, binding2: InputBindingInformation) => {
            return binding2.lastChange - binding1.lastChange;
        });

        return pressedKeys.shift().action;
    }
}
