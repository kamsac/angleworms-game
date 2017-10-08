import InputBindings from './input-bindings.type';

interface GameInput {
    readonly bindings: InputBindings;
    isAnyBindedKeyPressed: (bindingGroup: string) => boolean;
}

export default GameInput;
