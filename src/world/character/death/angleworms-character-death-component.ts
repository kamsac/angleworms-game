import GameInput from '../../../game-input/game-input.interface';
import Locator from '../../../locator';
import Representation from '../../../renderers/representation.type';
import Time from '../../../time';
import CharacterHead from '../../world-object/character-head';
import CharacterTail from '../../world-object/character-tail';
import Character from '../character.interface';
import CharacterDeathComponent from './character-death-component.interface';

export default class AnglewormsCharacterDeathComponent implements CharacterDeathComponent {
    private died: boolean;
    private ticksToLockEnd: number;
    private character: Character;
    private gameInput: GameInput;

    public constructor() {
        this.died = false;
        this.ticksToLockEnd = Time.secondsToTicks(1);
        this.gameInput = Locator.getGameInput();
    }

    public die(character: Character): void {
        this.died = true;
        this.character = character;
    }

    public update(): void {
        if (this.died) {
            this.updateBlinkingAnimation();
            this.stopAllCharacters();
            if (this.ticksToLockEnd-- <= 0) {
                this.restartRoundOnAnyKeyPressed();
            }
        }
    }

    private stopAllCharacters(): void {
        this.character.getWorld().getRound().stopAllCharacters();
    }

    private restartRound(): void {
        this.character.getWorld().getRound().start();
    }

    private restartRoundOnAnyKeyPressed(): void {
        if (this.gameInput.isAnyBindedKeyPressed('player1')) {
            this.restartRound();
        }
    }

    private updateBlinkingAnimation(): void {
        if (
            this.ticksToLockEnd % Math.round(Time.secondsToTicks(0.05)) === 0 &&
            this.ticksToLockEnd >= 0
        ) {
            this.toggleBlink();
        } else if (this.ticksToLockEnd < 0) {
            this.setAlpha(1);
        }
    }

    private toggleBlink() {
        const representation: Representation = this.character.getHead().getEveryRepresentation();
        const toggledAlpha: number = +!representation.ColorPixel.alpha;

        this.setAlpha(toggledAlpha);
    }

    private setAlpha(alpha: number) {
        const tailPieces: CharacterTail[] = this.character.getTailPieces();
        const head: CharacterHead = this.character.getHead();

        tailPieces.forEach((tailPiece: CharacterTail) => {
            tailPiece.setRepresentationProperty('ColorPixel', 'alpha', alpha);
        });

        head.setRepresentationProperty('ColorPixel', 'alpha', alpha);
    }
}
