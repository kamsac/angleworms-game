import Locator from '../../../locator';
import WorldObject from '../../world-object/world-object.interface';
import WorldPosition from '../../world-position.type';
import World from '../../world.interface';
import Character from '../character.interface';
import AiInputReflex from './ai-helpers/ai-input-reflex';
import AiWorldAnalyser from './ai-helpers/ai-world-analyser';
import CharacterInputComponent from './character-input-component.interface';

type GoDirection = {
    go: () => void;
    direction: string;
    isSafe: boolean;
    isAtTarget: boolean;
};

export default class AiCharacterInputComponent implements CharacterInputComponent {

    private world: World;
    private aiWorldAnalyser: AiWorldAnalyser;
    private targetPosition: WorldPosition;
    private randomChangeDirectionChance: number;
    private reflex: AiInputReflex;

    public constructor(aiWorldAnalyser: AiWorldAnalyser) {
        this.world = Locator.getWorld();
        this.aiWorldAnalyser = aiWorldAnalyser;
        this.targetPosition = null;
        this.randomChangeDirectionChance = 0.2;
        const changeDirectionCost = 0.2;
        const restPerMove = 0.1;
        this.reflex = new AiInputReflex(changeDirectionCost, restPerMove);
    }

    public update(character: Character) {
        if (character.getTicksSinceAnyMove() === 0) {
            this.getNearestTargetPosition(character);

            const directions: GoDirection[] = this.getDirections(character);
            const safeDirections: GoDirection[] = directions.filter((direction) => {
                return direction.isSafe;
            });
            const safeTargetDirections: GoDirection[] = safeDirections.filter((direction) => {
                return direction.isAtTarget;
            });

            if (safeDirections.length > 0) {
                const finalDirection: GoDirection = (safeTargetDirections.length > 0)
                    ?
                    this.chooseRandomDirection(safeTargetDirections)
                    :
                    this.chooseRandomDirection(safeDirections)
                ;

                if (this.doIWantToChangeDirection(character) && this.doIHaveEnoughReflex()) {
                    finalDirection.go();
                    this.reflex.getTiredBecauseOfChangeDirection();
                }
            } else {
                character.shoot();
            }

            this.reflex.getRestBecauseMove();
        }
    }

    private doIWantToChangeDirection(character: Character): boolean {
        return (
            !character.isSafeNotToChangeDirection() || this.doIFeelLikeChangingDirectionForNoGoodReason() ||
            this.canIChangeDirectionToTargetPosition(character)
        );
    }

    private doIFeelLikeChangingDirectionForNoGoodReason(): boolean {
        const chance: number = this.randomChangeDirectionChance - 2 * this.reflex.getFatigue();
        return (Math.random() < chance);
    }

    private doIHaveEnoughReflex(): boolean {
        return Math.random() >= this.reflex.getFatigue();
    }

    private getDirections(character: Character): GoDirection[] {
        const characterPosition: WorldPosition = character.getHead().getPosition();

        return [
            {
                go: () => { character.goLeft(); },
                direction: 'left',
                isSafe: character.isSafeToGoLeft(),
                isAtTarget: this.targetPosition && this.targetPosition.x < characterPosition.x,
            },
            {
                go: () => { character.goUp(); },
                direction: 'up',
                isSafe: character.isSafeToGoUp(),
                isAtTarget: this.targetPosition && this.targetPosition.y < characterPosition.y,
            },
            {
                go: () => { character.goRight(); },
                direction: 'right',
                isSafe: character.isSafeToGoRight(),
                isAtTarget: this.targetPosition && this.targetPosition.x > characterPosition.x,
            },
            {
                go: () => { character.goDown(); },
                direction: 'down',
                isSafe: character.isSafeToGoDown(),
                isAtTarget: this.targetPosition && this.targetPosition.y > characterPosition.y,
            },
        ];
    }

    private getNearestTargetPosition(character): void {
        const targetWorldObjectsTypes: string[] = ['apple', 'bullet'];
        const nearestTarget: WorldObject =
            this.aiWorldAnalyser.getNearestTargetWorldObject(character, targetWorldObjectsTypes);
        this.targetPosition = (nearestTarget) ? nearestTarget.getPosition() : null;
    }

    private canIChangeDirectionToTargetPosition(character: Character): boolean {
        const position: WorldPosition = character.getHead().getPosition();

        return (
            this.targetPosition &&
            (
                (this.targetPosition.x === position.x && (character.isMovingLeft() || character.isMovingRight() )) ||
                (this.targetPosition.y === position.y && (character.isMovingUp() || character.isMovingDown() ))
            )
        );
    }

    private chooseRandomDirection(safeDirections: GoDirection[]): GoDirection {
        const whichDirectionIWantToGoIndex: number = Math.floor(Math.random() * safeDirections.length );
        return safeDirections[whichDirectionIWantToGoIndex];
    }
}
