import WorldObjectImpl from './world-object';
import WorldObjectInitialSettings from './world-object-initial-settings.type';
import WorldObject from './world-object.interface';

export default class Apple extends WorldObjectImpl implements WorldObject {
    private foodValue: number;

    public constructor(initialSettings: WorldObjectInitialSettings) {
        super(initialSettings);

        this.representation = {
            ColorPixel: {
                color: '#f40',
            },
            Sprite: {
                spriteName: 'apple-world-object',
            },
        };

        this.type = 'apple';
        this.foodValue = 10;
    }

    public getFoodValue(): number {
        return this.foodValue;
    }
}
