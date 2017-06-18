import Dimensions from "../types/dimensions.type";

interface IMap {
    getSquareDimensions: () => Dimensions;
    getSize: () => Dimensions;
    draw: () => void;
}

export default IMap;