import WorldItem from './world-item';
import WorldItemInitialSettings from './world-item-initial-settings.type';

export default class PlayerHead extends WorldItem {
    public constructor(initialSettings: WorldItemInitialSettings) {
        super(initialSettings);
    }
}
