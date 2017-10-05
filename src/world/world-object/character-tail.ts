import WorldObjectImpl from './world-object';
import WorldObjectInitialSettings from './world-object-initial-settings.type';

export default class CharacterTail extends WorldObjectImpl {
    public constructor(initialSettings: WorldObjectInitialSettings) {
        super(initialSettings);

        this.type = 'character-tail';
    }
}
