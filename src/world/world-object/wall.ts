import WorldObjectImpl from './world-object';
import WorldObjectInitialSettings from './world-object-initial-settings.type';
import WorldObject from './world-object.interface';

export default class Wall extends WorldObjectImpl implements WorldObject {
    public constructor(initialSettings: WorldObjectInitialSettings) {
        super(initialSettings);

        this.representation = {
            ColorPixel: {
                color: '#888',
            },
            Sprite: {
                spriteName: 'wall-world-object',
            },
        };

        this.type = 'wall';
    }
}
