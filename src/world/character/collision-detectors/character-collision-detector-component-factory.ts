import AnglewormsCollisionDetectorComponent from './angleworms-collision-detector';
import CharacterCollisionDetectorComponent from './character-collision-detector-component.interface';
import ClassicSnakeCollisionDetectorComponent from './classic-snake-collision-detector';
import CollisionStyle from './collision-style.type';

export default class CharacterCollisionDetectorComponentFactory {
    public static create(collisionStyle: CollisionStyle): CharacterCollisionDetectorComponent {
        switch (collisionStyle) {
            case 'angleworms':
                return new AnglewormsCollisionDetectorComponent();
            case 'classic':
                return new ClassicSnakeCollisionDetectorComponent();
            default:
                throw new Error(
                    `Can't make \`${collisionStyle}\` CharacterCollisionDetectorComponent, but probably should!`);
        }
    }
}
