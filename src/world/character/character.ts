import Representation from '../../renderers/representation.type';
import Dimensions from '../dimensions.type';
import Vector2D from '../vector-2d.type';
import CharacterHead from '../world-object/character-head';
import WorldObjectInitialSettings from '../world-object/world-object-initial-settings.type';
import WorldPosition from '../world-position.type';
import World from '../world.interface';
import CharacterInitialSettings from './character-initial-settings.type';
import InputComponent from './character-inputs/character-input-component.interface';
import Character from './character.interface';
import CollisionDetectorComponent from './collision-detectors/character-collision-detector-component.interface';
import CharacterDeathComponent from './death/character-death-component.interface';
import GunComponent from './gun/gun-component.interface';
import TailManager from './tail-manager/tail-manager.interface';

export default class CharacterImpl implements Character {
    private input: InputComponent;
    private collisionDetector: CollisionDetectorComponent;
    private gun: GunComponent;
    private death: CharacterDeathComponent;
    private head: CharacterHead;
    private tailManager: TailManager;
    private representation: Representation;
    private world: World;
    private worldSize: Dimensions;

    public constructor(initialSettings: CharacterInitialSettings) {
        this.input = initialSettings.input;
        this.tailManager = initialSettings.tailManager;
        this.collisionDetector = initialSettings.collisionDetector;
        this.gun = initialSettings.gun;
        this.death = initialSettings.death;
        this.representation = initialSettings.representation;
        this.world = initialSettings.world;
        this.worldSize = this.world.getSize();

        this.tailManager.setGrowSpeed(initialSettings.speed / 4);
        this.initHead(initialSettings.position, initialSettings.direction, initialSettings.speed);
    }

    public update(): void {
        this.input.update(this);
        this.tailManager.update(this);
    }

    public getSize(): number {
        return this.tailManager.getSize();
    }

    public setSize(size: number): void {
        this.tailManager.setSize(size);
    }

    public getWorld(): World {
        return this.world;
    }

    public goLeft(): void {
        this.head.setDirection({
            x: -1,
            y: 0,
        });
    }

    public goUp(): void {
        this.head.setDirection({
            x: 0,
            y: -1,
        });
    }

    public goRight(): void {
        this.head.setDirection({
            x: 1,
            y: 0,
        });
    }

    public goDown(): void {
        this.head.setDirection({
            x: 0,
            y: 1,
        });
    }

    public shoot(): void {
        this.gun.shoot(this);
    }

    public isMoving(): boolean {
        const velocity: Vector2D = this.head.getVelocity();
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
        const ticksSinceMoved: Vector2D = this.head.getTicksSinceMoved();
        return Math.min(ticksSinceMoved.x, ticksSinceMoved.y);
    }

    public spawnTail(): void {
        this.tailManager.spawnTail(this);
    }

    public removeDeadTail(): void {
        this.tailManager.removeDeadTail(this);
    }

    public getHead(): CharacterHead {
        return this.head;
    }

    public die(): void {
        this.death.die(this);
    }

    private initHead(startPosition: WorldPosition, direction: Vector2D, speed: number): void {
        const headRepresentation: Representation = JSON.parse(JSON.stringify(this.representation));
        headRepresentation.Sprite.spriteName += '-head';

        const headInitialSettings: WorldObjectInitialSettings = {
            representation: headRepresentation,
            position: startPosition,
            world: this.world,
        };

        this.head = new CharacterHead(headInitialSettings, this);
        this.head.setDirection(direction);
        this.head.setSpeed(speed);
    }
}
