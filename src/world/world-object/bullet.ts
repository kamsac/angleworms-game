import Time from '../../time';
import Character from '../character/character.interface';
import GunComponent from '../character/gun/gun-component.interface';
import WorldPositionHelper from '../world-position-helper';
import WorldPosition from '../world-position.type';
import WorldObjectImpl from './world-object';
import WorldObjectInitialSettings from './world-object-initial-settings.type';
import WorldObject from './world-object.interface';

export default class Bullet extends WorldObjectImpl implements WorldObject {
    private gun: GunComponent;
    private character: Character;

    public constructor(initialSettings: WorldObjectInitialSettings, gun: GunComponent, character: Character) {
        super(initialSettings);

        this.representation = {
            ColorPixel: {
                color: '#444',
            },
            Sprite: {
                spriteName: 'bullet',
            },
        };
        this.gun = gun;
        this.character = character;

        this.type = 'bullet';
        this.speed = character.getHead().getSpeed() * 3;
        this.direction = character.getHead().getDirection();
    }

    protected beforeMove(): boolean {
        if (!this.removeItselfIfOutsideMap()) {
            this.destroyWorldObjects();
            return true;
        }

        return false;
    }

    protected afterMove(): void {
        this.destroyWorldObjects();
    }

    private removeItselfIfOutsideMap(): boolean {
        const futurePosition: WorldPosition =
            WorldPositionHelper.getAdjacentFuturePosition(this.position, this.getVelocity());
        const isOutsideWorld: boolean = WorldPositionHelper.isOutsideWorld(futurePosition, this.worldSize, 1);
        if (isOutsideWorld) {
            this.removeItself();
            this.gun.cleanBullet();
            return true;
        }

        return false;
    }

    private destroyWorldObjects(): void {
        this.world.removeWorldObjectsAt(this.position, ['wall', 'character-tail']);
    }
}
