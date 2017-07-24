import IInputComponent from '../interfaces/input-component.interface';
import IMap from '../interfaces/map.interface';
import ICollisionDetectorComponent from '../interfaces/player-collision-detector-component.interface';
import IPlayer from '../interfaces/player.interface';
import Color from '../types/color.type';
import Dimensions from '../types/dimensions.type';
import MapPosition from '../types/map-position.type';
import PlayerInitialSettings from '../types/player-initial-settings.type';
import Velocity from '../types/velocity.type';
import Head from './head';
import Locator from './locator';
import Tail from './tail';

export default class Player implements IPlayer {
    private input: IInputComponent;
    private collisionDetector: ICollisionDetectorComponent;
    private velocity: Velocity;
    private color: Color;
    private head: Head;
    private tail: Tail[];
    private size: number;
    private mapSize: Dimensions;
    private map: IMap;
    private ticksToMove: number;
    private readonly ticksToMoveDelay: number;
    private ticksToGrow: number;
    private readonly ticksToGrowDelay: number;

    public constructor(
        initialSettings: PlayerInitialSettings,
        input: IInputComponent,
        collisionDetector: ICollisionDetectorComponent,
    ) {
        this.input = input;
        this.collisionDetector = collisionDetector;
        this.color = initialSettings.color;
        this.velocity = initialSettings.velocity;
        this.tail = [];
        this.size = 0;
        this.ticksToMove = 0;
        this.ticksToMoveDelay = Math.round(120 / 10);
        this.ticksToGrow = 0;
        this.ticksToGrowDelay = Math.round(this.ticksToMoveDelay * 4);
        this.mapSize = Locator.getMap().getSize();
        this.map = Locator.getMap();

        this.initHead(initialSettings.position);
    }

    public update(): void {
        this.input.update(this);
        this.updateTail();
        this.moveHead();
    }

    public draw(): void {
        this.drawTail();
        this.drawHead();
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

    public getHead(): Head {
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

    private setColor(color: Color) {
        this.color = color;
        this.head.setColor(this.color);
    }

    private updateTail(): void {
        this.removeDeadTail();
        this.growSize();
    }

    private spawnTail(): void {
        const tail = new Tail();
        const position: MapPosition = {
            x: this.head.getPosition().x,
            y: this.head.getPosition().y,
        };

        tail.setPosition(position);
        tail.setColor(this.color);
        this.tail.push(tail);
    }

    private removeDeadTail(): void {
        if (this.tail.length > this.size) {
            for (let i = 0; this.tail.length - this.size; i++) {
                const removedTailPiece: Tail = this.tail.shift();
                this.map.removeMapItem(removedTailPiece);
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

    private drawHead(): void {
        this.head.draw();
    }

    private drawTail(): void {
        for (const tail of this.tail) {
            tail.draw();
        }
    }

    private initHead(startPosition: MapPosition): void {
        this.head = new Head();
        this.head.setPosition(startPosition);
        this.head.setColor(this.color);
    }
}
