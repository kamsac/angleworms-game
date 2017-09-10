import Locator from '../../locator';
import Representation from '../../renderers/representation.type';
import Dimensions from '../dimensions.type';
import Velocity from '../velocity.type';
import CharacterHead from '../world-item/character-head';
import CharacterTail from '../world-item/character-tail';
import WorldItemInitialSettings from '../world-item/world-item-initial-settings.type';
import WorldPosition from '../world-position.type';
import World from '../world.interface';
import CharacterInitialSettings from './character-initial-settings.type';
import InputComponent from './character-inputs/character-input-component.interface';
import Character from './character.interface';
import CollisionDetectorComponent from './collision-detectors/character-collision-detector-component.interface';

export default class CharacterImpl implements Character {
    private input: InputComponent;
    private collisionDetector: CollisionDetectorComponent;
    private velocity: Velocity;
    private head: CharacterHead;
    private tail: CharacterTail[];
    private size: number;
    private representation: Representation;
    private worldSize: Dimensions;
    private world: World;
    private ticksToMove: number;
    private readonly ticksToMoveDelay: number;
    private ticksToGrow: number;
    private readonly ticksToGrowDelay: number;

    public constructor(initialSettings: CharacterInitialSettings) {
        this.input = initialSettings.input;
        this.collisionDetector = initialSettings.collisionDetector;
        this.velocity = initialSettings.velocity;
        this.tail = [];
        this.size = 0;
        this.representation = initialSettings.representation;
        this.ticksToMove = 0;
        this.ticksToMoveDelay = Math.round(120 / 10);
        this.ticksToGrow = 0;
        this.ticksToGrowDelay = Math.round(this.ticksToMoveDelay * 4);
        this.worldSize = Locator.getWorld().getSize();
        this.world = Locator.getWorld();

        this.initHead(initialSettings.position);
    }

    public update(): void {
        this.input.update(this);
        this.updateTail();
        this.moveHead();
    }

    public getVelocity(): Velocity {
        return this.velocity;
    }

    public setVelocity(velocity: Velocity): void {
        this.velocity = velocity;
    }

    public getSize(): number {
        return this.size;
    }

    public setSize(size: number): void {
        this.size = size;
    }

    public goLeft(): void {
        this.velocity = {x: -1, y: 0};
    }

    public goUp(): void {
        this.velocity = {x: 0, y: -1};
    }

    public goRight(): void {
        this.velocity = {x: 1, y: 0};
    }

    public goDown(): void {
        this.velocity = {x: 0, y: 1};
    }

    public isMoving(): boolean {
        return (this.velocity.x !== 0 ||
                this.velocity.y !== 0);
    }

    public isMovingLeft(): boolean {
        return this.velocity.x === -1;
    }

    public isMovingUp(): boolean {
        return this.velocity.y === -1;
    }

    public isMovingRight(): boolean {
        return this.velocity.x === 1;
    }

    public isMovingDown(): boolean {
        return this.velocity.y === 1;
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

    public getTicksToMove(): number {
        return this.ticksToMove;
    }

    public getTicksToMoveDelay(): number {
        return this.ticksToMoveDelay;
    }

    public getHead(): CharacterHead {
        return this.head;
    }

    private moveHead(): void {
        if (++this.ticksToMove === this.ticksToMoveDelay) {

            if (this.isSafeNotToChangeDirection()) {
                this.head.move(this.velocity);

                this.spawnTail();
            } else if (this.isMoving()) {
                this.kindaDie();
            }

            this.ticksToMove = 0;
        }
    }

    private kindaDie(): void {
        this.size = 0;
    }

    private updateTail(): void {
        this.removeDeadTail();
        this.growSize();
    }

    private spawnTail(): void {
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

        tail.setPosition(position);
        tail.move({
            x: -this.velocity.x,
            y: -this.velocity.y,
        });
        this.tail.push(tail);
    }

    private removeDeadTail(): void {
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

    private growSize(): void {
        if (++this.ticksToGrow === this.ticksToGrowDelay) {
            if (this.isMoving()) {
                this.size++;
            }

            this.ticksToGrow = 0;
        }
    }

    private initHead(startPosition: WorldPosition): void {
        const headRepresentation: Representation = JSON.parse(JSON.stringify(this.representation));
        headRepresentation.Sprite.spriteName += '-head';

        const headInitialSettings: WorldItemInitialSettings = {
            representation: headRepresentation,
            position: startPosition,
        };

        this.head = new CharacterHead(headInitialSettings);
    }
}
