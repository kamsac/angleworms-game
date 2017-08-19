import InputBindings from './input-bindings.type';

interface GameInput {
    readonly bindings: InputBindings<string>;
    readonly pressed: InputBindings<boolean>;
}

export default GameInput;