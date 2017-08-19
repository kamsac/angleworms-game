import GameInput from './game-input.interface';
import InputBindings from './input-bindings.type';

export default class GameInputImpl implements GameInput {
    public bindings: InputBindings<string>;
    public pressed: InputBindings<boolean>;

    public constructor() {
        this.bindings = {
            player1: {
                left: 'ArrowLeft',
                up: 'ArrowUp',
                right: 'ArrowRight',
                down: 'ArrowDown',
                cheatGrow: '1',
                cheatShrink: '2',
            },
        };

        this.pressed = {
            player1: {
                left: false,
                up: false,
                right: false,
                down: false,
                cheatGrow: false,
                cheatShrink: false,
            },
        };

        this.initKeyboard();
    }

    private static getKeyFromKeyboardEvent(event: KeyboardEvent): string {
        return event.key;
    }

    private updateInput(pressedKey: string, pressed: boolean) {
        for (const bindingGroup in this.bindings) {
            if (this.bindings.hasOwnProperty(bindingGroup)) {
                for (const actionName in this.bindings[bindingGroup]) {
                    if (this.bindings[bindingGroup].hasOwnProperty(actionName)) {
                        const actionKey: string = this.bindings[bindingGroup][actionName];
                        if (actionKey === pressedKey) {
                            this.pressed[bindingGroup][actionName] = pressed;
                        }
                    }
                }
            }
        }
    }

    private onKeydown(event: KeyboardEvent): void {
        const key: string = GameInputImpl.getKeyFromKeyboardEvent(event);

        this.updateInput(key, true);
    }

    private onKeyup(event: KeyboardEvent): void {
        const key: string = GameInputImpl.getKeyFromKeyboardEvent(event);

        this.updateInput(key, false);
    }

    private initKeyboard(): void {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            this.onKeydown(event);
        }, false);

        window.addEventListener('keyup', (event: KeyboardEvent) => {
            this.onKeyup(event);
        }, false);
    }
}