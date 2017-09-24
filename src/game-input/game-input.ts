import GameInput from './game-input.interface';
import InputBindings from './input-bindings.type';

export default class GameInputImpl implements GameInput {
    public bindings: InputBindings;

    public constructor() {
        this.bindings = {
            player1: {
                left: {
                    keyName: 'ArrowLeft',
                    isPressed: false,
                    lastChange: null,
                    group: 'player1',
                    action: 'left',
                },
                up: {
                    keyName: 'ArrowUp',
                    isPressed: false,
                    lastChange: null,
                    group: 'player1',
                    action: 'up',
                },
                right: {
                    keyName: 'ArrowRight',
                    isPressed: false,
                    lastChange: null,
                    group: 'player1',
                    action: 'right',
                },
                down: {
                    keyName: 'ArrowDown',
                    isPressed: false,
                    lastChange: null,
                    group: 'player1',
                    action: 'down',
                },
                shoot: {
                    keyName: ' ',
                    isPressed: false,
                    lastChange: null,
                    group: 'player1',
                    action: 'shoot',
                },
                cheatGrow: {
                    keyName: '1',
                    isPressed: false,
                    lastChange: null,
                    group: 'player1',
                    action: 'cheatGrow',
                },
                cheatShrink: {
                    keyName: '2',
                    isPressed: false,
                    lastChange: null,
                    group: 'player1',
                    action: 'cheatShrink',
                },
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
                        const actionKey: string = this.bindings[bindingGroup][actionName].keyName;
                        if (actionKey === pressedKey) {
                            this.bindings[bindingGroup][actionName].isPressed = pressed;
                            this.bindings[bindingGroup][actionName].lastChange = new Date().valueOf();
                        }
                    }
                }
            }
        }
    }

    private onKeydown(event: KeyboardEvent): void {
        const key: string = GameInputImpl.getKeyFromKeyboardEvent(event);

        if (!event.repeat) {
            this.updateInput(key, true);
        }
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
