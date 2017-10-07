import Vector2D from '../../vector-2d.type';
import Bullet from '../../world-object/bullet';
import WorldPositionHelper from '../../world-position-helper';
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
        if (!this.bulletAlive && this.bulletsLeft && character.isMoving()) {
            this.bulletsLeft--;
            const characterPosition: WorldPosition = character.getHead().getPosition();
            const characterVelocity: Vector2D = character.getHead().getVelocity();
            const position: WorldPosition =
                WorldPositionHelper.getAdjacentFuturePosition(characterPosition, characterVelocity);
            this.bulletAlive = new Bullet({
                position: position,
                world: character.getWorld(),
            }, this, character);
        }
    }

    public cleanBullet(): void {
        this.bulletAlive = null;
    }
}
