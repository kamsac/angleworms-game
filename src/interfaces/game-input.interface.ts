import InputBindings from "../types/input-bindings.type";
interface IGameInput {
    readonly bindings: InputBindings<string>;
    readonly pressed: InputBindings<boolean>;
}

export default IGameInput;