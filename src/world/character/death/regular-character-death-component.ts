import Time from '../../../time';
import Character from '../character.interface';
import CharacterDeathComponent from './character-death-component.interface';

export default class RegularCharacterDeathComponent implements CharacterDeathComponent {
    private died: boolean;
    private ticksToLockEnd: number;
    private character: Character;

    public constructor() {
        this.died = false;
        this.ticksToLockEnd = Time.secondsToTicks(1);
    }

    public die(character: Character): void {
        this.died = true;
        this.character = character;
    }

    public update(): void {
        if (this.died) {
            this.character.removeAllTail();
            this.stopAllCharacters();
            if (this.ticksToLockEnd-- <= 0) {
                this.restartRound();
            }
        }
    }

    private stopAllCharacters(): void {
        this.character.getWorld().getRound().stopAllCharacters();
    }

    private restartRound(): void {
        this.character.getWorld().getRound().start();
    }
}
