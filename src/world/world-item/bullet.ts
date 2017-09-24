import Character from '../character/character.interface';
import GunComponent from '../character/gun/gun-component.interface';
import Velocity from '../velocity.type';
import WorldItemImpl from './world-item';
import WorldItemInitialSettings from './world-item-initial-settings.type';
import WorldItem from './world-item.interface';

export default class Bullet extends WorldItemImpl implements WorldItem {
    private ticksToMoveDelay: number;
    private ticksToMove: number;
    private velocity: Velocity;
    private gun: GunComponent;
    private character: Character;

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
        this.velocity = this.character.getVelocity();
        this.ticksToMoveDelay = Math.round(120 / 30);
        this.ticksToMove = this.character.getTicksToMove();
    }

    public update(): void {
        if (++this.ticksToMove >= this.ticksToMoveDelay) {
            if (!this.removeItselfIfOutsideMap()) {

                this.destroyWorldItems();

                this.move(this.velocity);

                this.ticksToMove = 0;
            }
        }
    }

    public removeItselfIfOutsideMap(): boolean {
        const futureX: number = this.position.x + this.velocity.x;
        const futureY: number = this.position.y + this.velocity.y;
        if (
            futureX < 0 || futureX > this.worldSize.width - 1 ||
            futureY < 0 || futureY > this.worldSize.height - 1
        ) {
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
