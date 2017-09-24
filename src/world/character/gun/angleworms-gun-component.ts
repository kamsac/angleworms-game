import Velocity from '../../velocity.type';
import Bullet from '../../world-item/bullet';
import WorldPosition from '../../world-position.type';
import Character from '../character.interface';
import GunComponent from './gun-component.interface';

export default class AnglewormsGunComponent implements GunComponent {
    private bulletAlive: Bullet;
    private bulletsLeft: number;

    public constructor() {
        this.bulletAlive = null;
        this.bulletsLeft = 99;
    }

    public shoot(character: Character): void {
        if (!this.bulletAlive && this.bulletsLeft) {
            this.bulletsLeft--;
            const characterPosition: WorldPosition = character.getHead().getPosition();
            const characterVelocity: Velocity = character.getVelocity();
            const position: WorldPosition = {
                x: characterPosition.x + characterVelocity.x,
                y: characterPosition.y + characterVelocity.y,
            };
            this.bulletAlive = new Bullet({
                position: position,
            }, this, character);
        }
    }

    public cleanBullet(): void {
        this.bulletAlive = null;
    }
}
