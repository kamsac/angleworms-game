import Locator from '../../../locator';
import World from '../../world.interface';
import Character from '../character.interface';
import CharacterInputComponent from './character-input-component.interface';

export default class AiCharacterInputComponent implements CharacterInputComponent {

    private world: World;

    public constructor() {
        this.world = Locator.getWorld();
    }

    public update(character: Character) {
        if (character.getTicksToMove() === 0) {
            const safeCharacterActions = [];
            if (character.isSafeToGoLeft()) {
                safeCharacterActions.push(() => { character.goLeft(); });
            }
            if (character.isSafeToGoUp()) {
                safeCharacterActions.push(() => { character.goUp(); });
            }
            if (character.isSafeToGoRight()) {
                safeCharacterActions.push(() => { character.goRight(); });
            }
            if (character.isSafeToGoDown()) {
                safeCharacterActions.push(() => { character.goDown(); });
            }
            const doIHaveAnySafeMoves = () => safeCharacterActions.length > 0;
            if (doIHaveAnySafeMoves()) {
                const whichDirectionIWantToGo: number = Math.floor(Math.random() * safeCharacterActions.length );
                const goChangeDirection = () => { safeCharacterActions[whichDirectionIWantToGo](); };

                if (!character.isSafeNotToChangeDirection() || this.doIFeelLikeChangingDirectionForNoGoodReason()) {
                    goChangeDirection();
                }
            }
        }
    }

    private doIFeelLikeChangingDirectionForNoGoodReason(): boolean {
        return (Math.random() < 0.2);
    }
}
