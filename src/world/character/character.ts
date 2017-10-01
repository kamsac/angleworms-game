import Locator from '../../locator';
import Representation from '../../renderers/representation.type';
import Dimensions from '../dimensions.type';
import VelocityHelper from '../velocity-helper';
import Velocity from '../velocity.type';
import CharacterHead from '../world-item/character-head';
import CharacterTail from '../world-item/character-tail';
import WorldItemInitialSettings from '../world-item/world-item-initial-settings.type';
import WorldPositionHelper from '../world-position-helper';
import WorldPosition from '../world-position.type';
import World from '../world.interface';
import CharacterInitialSettings from './character-initial-settings.type';
import InputComponent from './character-inputs/character-input-component.interface';
import Character from './character.interface';
import CollisionDetectorComponent from './collision-detectors/character-collision-detector-component.interface';
import GunComponent from './gun/gun-component.interface';

export default class CharacterImpl implements Character {
    private input: InputComponent;
    private collisionDetector: CollisionDetectorComponent;
    private gun: GunComponent;
    private head: CharacterHead;
    private tail: CharacterTail[];
    private size: number;
    private representation: Representation;
    private worldSize: Dimensions;
    private world: World;
    private moveSpeed: number;
    private growSpeed: number;
    private ticksSinceGrow: number;

    public constructor(initialSettings: CharacterInitialSettings) {
        this.input = initialSettings.input;
        this.collisionDetector = initialSettings.collisionDetector;
        this.gun = initialSettings.gun;
        this.tail = [];
        this.size = 0;
        this.representation = initialSettings.representation;
        this.moveSpeed = 15;
        this.growSpeed = this.moveSpeed / 4;
        this.ticksSinceGrow = 0;
        this.worldSize = Locator.getWorld().getSize();
        this.world = Locator.getWorld();

        this.initHead(initialSettings.position, initialSettings.velocity);
    }

    public update(): void {
        this.input.update(this);
        this.growSize();
    }

    public getSize(): number {
        return this.size;
    }

    public setSize(size: number): void {
        this.size = size;
    }

    public goLeft(): void {
        this.head.setVelocity({
            x: -this.moveSpeed,
            y: 0,
        });
    }

    public goUp(): void {
        this.head.setVelocity({
            x: 0,
            y: -this.moveSpeed,
        });
    }

    public goRight(): void {
        this.head.setVelocity({
            x: this.moveSpeed,
            y: 0,
        });
    }

    public goDown(): void {
        this.head.setVelocity({
            x: 0,
            y: this.moveSpeed,
        });
    }

    public shoot(): void {
        this.gun.shoot(this);
    }

    public isMoving(): boolean {
        const velocity: Velocity = this.head.getVelocity();
        return (velocity.x !== 0 ||
                velocity.y !== 0);
    }

    public isMovingLeft(): boolean {
        return this.head.getVelocity().x < 0;
    }

    public isMovingUp(): boolean {
        return this.head.getVelocity().y < 0;
    }

    public isMovingRight(): boolean {
        return this.head.getVelocity().x > 0;
    }

    public isMovingDown(): boolean {
        return this.head.getVelocity().y > 0;
    }

    public isSafeToGoLeft(): boolean {
        return this.collisionDetector.isSafeToGoLeft(this);
    }

    public isSafeToGoUp(): boolean {
        return this.collisionDetector.isSafeToGoUp(this);
    }

    public isSafeToGoRight(): boolean {
        return this.collisionDetector.isSafeToGoRight(this);
    }

    public isSafeToGoDown(): boolean {
        return this.collisionDetector.isSafeToGoDown(this);
    }

    public isSafeNotToChangeDirection(): boolean {
        return this.collisionDetector.isSafeNotToChangeDirection(this);
    }

    public getTicksSinceAnyMove(): number {
        const ticksSinceMoved: Velocity = this.head.getTicksSinceMoved();
        return Math.min(ticksSinceMoved.x, ticksSinceMoved.y);
    }

    public spawnTail(): void {
        const tailRepresentation: Representation = JSON.parse(JSON.stringify(this.representation));
        tailRepresentation.Sprite.spriteName += '-tail';

        const position: WorldPosition = {
            x: this.head.getPosition().x,
            y: this.head.getPosition().y,
        };

        const tailInitialSettings: WorldItemInitialSettings = {
            representation: tailRepresentation,
            position: position,
        };

        const tail = new CharacterTail(tailInitialSettings);

        tail.move(WorldPositionHelper.getAdjacentPastPosition(position, this.head.getVelocity()));
        this.tail.push(tail);
    }

    public removeDeadTail(): void {
        if (this.tail.length > this.size) {
            for (let i = 0; this.tail.length - this.size; i++) {
                const removedTailPiece: CharacterTail = this.tail.shift();
                this.world.removeWorldItem(removedTailPiece);

                this.world.removeWorldItemsAt(removedTailPiece.getPosition(), [
                    'character-tail',
                    'wall',
                ]);
            }
        }
    }

    public getHead(): CharacterHead {
        return this.head;
    }

    public die(): void {
        this.size = 0;
        this.removeDeadTail();
    }

    private growSize(): void {
        if (this.ticksSinceGrow++ >= VelocityHelper.speedToTicks(this.growSpeed)) {
            if (this.isMoving()) {
                this.size++;
            }

            this.ticksSinceGrow = 0;
        }
    }

    private initHead(startPosition: WorldPosition, velocity: Velocity): void {
        const headRepresentation: Representation = JSON.parse(JSON.stringify(this.representation));
        headRepresentation.Sprite.spriteName += '-head';

        const headInitialSettings: WorldItemInitialSettings = {
            representation: headRepresentation,
            position: startPosition,
        };

        this.head = new CharacterHead(headInitialSettings, this);
        this.head.setVelocity(velocity);
    }
}
