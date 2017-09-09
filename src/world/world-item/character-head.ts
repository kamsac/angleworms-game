import WorldItemImpl from './world-item';
import WorldItemInitialSettings from './world-item-initial-settings.type';

export default class CharacterHead extends WorldItemImpl {
    public constructor(initialSettings: WorldItemInitialSettings) {
        super(initialSettings);

        this.type = 'character-head';
    }
}
