import AnglewormsCollisionDetectorComponent from './angleworms-collision-detector';
import ClassicSnakeCollisionDetectorComponent from './classic-snake-collision-detector';
import CollisionStyle from './collision-style.type';
import PlayerCollisionDetectorComponent from './player-collision-detector-component.interface';

export default class PlayerCollisionDetectorComponentFactory {
    public static create(collisionStyle: CollisionStyle): PlayerCollisionDetectorComponent {
        switch (collisionStyle) {
            case 'angleworms':
                return new AnglewormsCollisionDetectorComponent();
            case 'classic':
                return new ClassicSnakeCollisionDetectorComponent();
            default:
                throw new Error(
                    `Can't make \`${collisionStyle}\` PlayerCollisionDetectorComponent, but probably should!`);
        }
    }
}
