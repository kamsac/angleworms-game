import IMovable from "./movable.interface";

interface IInputComponent {
    init: (movable: IMovable) => void;
}

export default IInputComponent;