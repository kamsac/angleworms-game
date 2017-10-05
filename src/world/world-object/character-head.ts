import Character from '../character/character.interface';
import Apple from './apple';
import WorldObjectImpl from './world-object';
import WorldObjectInitialSettings from './world-object-initial-settings.type';

export default class CharacterHead extends WorldObjectImpl {
    private character: Character;

    public constructor(initialSettings: WorldObjectInitialSettings, character: Character) {
        super(initialSettings);

        this.type = 'character-head';
        this.character = character;
    }

    protected beforeMove(): boolean {
        if (!this.character.isSafeNotToChangeDirection()) {
            this.character.die();
            return false;
        }

        return true;
    }

    protected afterMove(): void {
        this.handleApple();
        this.character.spawnTail();
        this.character.removeDeadTail();
    }

    private handleApple() {
        const apples: Apple[] = this.world.getWorldObjectsAt(this.position, ['apple']) as Apple[];
        for (const apple of apples) {
            this.character.setSize( this.character.getSize() + apple.getFoodValue() );
            this.world.removeWorldObject(apple);

            this.world.spawnApple();
        }
    }
}
