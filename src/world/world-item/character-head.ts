import Character from '../character/character.interface';
import Apple from './apple';
import WorldItemImpl from './world-item';
import WorldItemInitialSettings from './world-item-initial-settings.type';

export default class CharacterHead extends WorldItemImpl {
    private character: Character;

    public constructor(initialSettings: WorldItemInitialSettings, character: Character) {
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
        const apples: Apple[] = this.world.getWorldItemsAt(this.position, ['apple']) as Apple[];
        for (const apple of apples) {
            this.character.setSize( this.character.getSize() + apple.getFoodValue() );
            this.world.removeWorldItem(apple);

            this.world.spawnApple();
        }
    }
}
