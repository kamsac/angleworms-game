import InputBindingInformation from './input-binding-information.type';

type InputBindings = {
    player1: {
        left: InputBindingInformation;
        up: InputBindingInformation;
        right: InputBindingInformation;
        down: InputBindingInformation;
        shoot: InputBindingInformation;
        cheatGrow: InputBindingInformation;
        cheatShrink: InputBindingInformation;
    },
};

export default InputBindings;
