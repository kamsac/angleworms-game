import WorldItemImpl from './world-item';
import WorldItemInitialSettings from './world-item-initial-settings.type';

export default class Wall extends WorldItemImpl {
    public constructor(initialSettings: WorldItemInitialSettings) {
        super(initialSettings);

        this.representation = {
            ColorPixel: {
                color: '#888',
            },
            Sprite: {
                spriteName: 'wall-world-item',
            },
        };

        this.type = 'wall';
    }
}
