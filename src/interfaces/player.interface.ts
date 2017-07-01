import IDrawable from "./drawable.interface";
import IMovable from "./movable.interface";
import ISizable from "./sizable.interface";

interface IPlayer extends IDrawable, IMovable, ISizable {

}

export default IPlayer