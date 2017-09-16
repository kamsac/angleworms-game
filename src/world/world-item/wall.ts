import WorldItemImpl from './world-item';
import WorldItemInitialSettings from './world-item-initial-settings.type';
import WorldItem from './world-item.interface';

export default class Wall extends WorldItemImpl implements WorldItem {
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
