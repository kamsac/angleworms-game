import IGameInput from "../interfaces/game-input.interface";
import InputBindings from "../types/input-bindings.type";

export default class GameInput implements IGameInput {
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
                cheatShrink: '2'
            }
        };

        this.pressed = {
            player1: {
                left: false,
                up: false,
                right: false,
                down: false,
                cheatGrow: false,
                cheatShrink: false
            }
        };

        this.initKeyboard();
    }

    private static getKeyFromKeyboardEvent(event: KeyboardEvent): string {
        return event.key;
    }

    private updateInput(pressedKey: string, pressed: boolean) {
        for(let bindingGroup in this.bindings) {
            for(let actionName in this.bindings[bindingGroup]) {
                const actionKey: string = this.bindings[bindingGroup][actionName];
                if (actionKey === pressedKey) {
                    this.pressed[bindingGroup][actionName] = pressed;
                }
            }
        }
    }

    private onKeydown(event: KeyboardEvent): void {
        const key: string = GameInput.getKeyFromKeyboardEvent(event);

        this.updateInput(key, true);
    }

    private onKeyup(event: KeyboardEvent): void {
        const key: string = GameInput.getKeyFromKeyboardEvent(event);

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