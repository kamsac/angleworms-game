import Color from "./color.type";
import MapPosition from "./map-position.type";
import Velocity from "./velocity.type";

type PlayerInitialSettings = {
    color: Color;
    position: MapPosition;
    velocity: Velocity;
}

export default PlayerInitialSettings;