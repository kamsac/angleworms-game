import WorldItemImpl from './world-item';
import WorldItemInitialSettings from './world-item-initial-settings.type';
import WorldItem from './world-item.interface';

export default class Apple extends WorldItemImpl implements WorldItem {
    private foodValue: number;

    public constructor(initialSettings: WorldItemInitialSettings) {
        super(initialSettings);

        this.representation = {
            ColorPixel: {
                color: '#f40',
            },
            Sprite: {
                spriteName: 'apple-world-item',
            },
        };

        this.type = 'apple';
        this.foodValue = 10;
    }

    public getFoodValue(): number {
        return this.foodValue;
    }
}
