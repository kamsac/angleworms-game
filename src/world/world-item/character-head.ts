import WorldItem from './world-item';
import WorldItemInitialSettings from './world-item-initial-settings.type';

export default class CharacterHead extends WorldItem {
    public constructor(initialSettings: WorldItemInitialSettings) {
        super(initialSettings);
    }
}
