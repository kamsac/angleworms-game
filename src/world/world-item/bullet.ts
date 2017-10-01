import Character from '../character/character.interface';
import GunComponent from '../character/gun/gun-component.interface';
import VelocityHelper from '../velocity-helper';
import WorldPositionHelper from '../world-position-helper';
import WorldPosition from '../world-position.type';
import WorldItemImpl from './world-item';
import WorldItemInitialSettings from './world-item-initial-settings.type';
import WorldItem from './world-item.interface';

export default class Bullet extends WorldItemImpl implements WorldItem {
    private gun: GunComponent;
    private character: Character;
    private speed: number;

    public constructor(initialSettings: WorldItemInitialSettings, gun: GunComponent, character: Character) {
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
        this.speed = 20;
        this.velocity = VelocityHelper.fasten(this.character.getHead().getVelocity(), this.speed);
    }

    protected beforeMove(): boolean {
        if (!this.removeItselfIfOutsideMap()) {
            this.destroyWorldItems();
            return true;
        }

        return false;
    }

    protected afterMove(): void {
        this.destroyWorldItems();
    }

    private removeItselfIfOutsideMap(): boolean {
        const futurePosition: WorldPosition =
            WorldPositionHelper.getAdjacentFuturePosition(this.position, this.velocity);
        const isOutsideWorld: boolean = WorldPositionHelper.isOutsideWorld(futurePosition, this.worldSize, 1);
        if (isOutsideWorld) {
            this.removeItself();
            this.gun.cleanBullet();
            return true;
        }

        return false;
    }

    private destroyWorldItems(): void {
        this.world.removeWorldItemsAt(this.position, ['wall', 'character-tail']);
    }
}
