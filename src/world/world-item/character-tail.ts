import WorldItemImpl from './world-item';
import WorldItemInitialSettings from './world-item-initial-settings.type';

export default class CharacterTail extends WorldItemImpl {
    public constructor(initialSettings: WorldItemInitialSettings) {
        super(initialSettings);

        this.type = 'character-tail';
    }
}
