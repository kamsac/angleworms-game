import Locator from '../../../locator';
import World from '../../world.interface';
import Character from '../character.interface';
import AiInputReflex from './ai-input-reflex';
import CharacterInputComponent from './character-input-component.interface';

export default class AiCharacterInputComponent implements CharacterInputComponent {

    private world: World;
    private randomChangeDirectionChance: number;
    private reflex: AiInputReflex;

    public constructor() {
        this.world = Locator.getWorld();
        this.randomChangeDirectionChance = 0.2;
        this.reflex = new AiInputReflex(0.2, 0.1);
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

                if (this.doIWantToChangeDirection(character) && this.doIHaveEnoughReflex()) {
                    goChangeDirection();
                    this.reflex.getTiredBecauseOfChangeDirection();
                }
            }

            this.reflex.getRestBecauseMove();
        }
    }

    private doIWantToChangeDirection(character: Character): boolean {
        return (!character.isSafeNotToChangeDirection() || this.doIFeelLikeChangingDirectionForNoGoodReason());
    }

    private doIFeelLikeChangingDirectionForNoGoodReason(): boolean {
        const chance: number = this.randomChangeDirectionChance - 2 * this.reflex.getFatigue();
        return (Math.random() < chance);
    }

    private doIHaveEnoughReflex(): boolean {
        return Math.random() >= this.reflex.getFatigue();
    }
}
