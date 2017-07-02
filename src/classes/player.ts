import Head from "./head";
import Velocity from "../types/velocity.type";
import Dimensions from "../types/dimensions.type";
import Locator from "./locator";
import Color from "../types/color.type";
import Tail from "./tail";
import MapPosition from "../types/map-position.type";
import IMap from "../interfaces/map.interface";
import IInputComponent from "../interfaces/input-component.interface";
import IPlayer from "../interfaces/player.interface";

export default class Player implements IPlayer {
    private input: IInputComponent;
    private velocity: Velocity;
    private color: Color;
    private head: Head;
    private tail: Tail[];
    private size: number;
    private mapSize: Dimensions;
    private map: IMap;
    private ticksLived: number;

    public constructor(input: IInputComponent) {
        this.input = input;
        this.color = '#0f0';
        this.velocity = {x: 0, y: 0};
        this.tail = [];
        this.size = 0;
        this.ticksLived = 0;
        this.mapSize = Locator.getMap().getSize();
        this.map = Locator.getMap();

        this.initHead();
        this.input.init(this);
    }

    public update(): void {
        this.input.update(this);
        this.updateTail();
        this.moveHead();

        this.ticksLived++;
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
        const position = {
            x: this.head.getPosition().x - 1,
            y: this.head.getPosition().y
        };

        return (this.map.getMapItemsAt(position).length === 0);
    }

    public isSafeToGoUp(): boolean {
        const position = {
            x: this.head.getPosition().x,
            y: this.head.getPosition().y - 1
        };

        return (this.map.getMapItemsAt(position).length === 0);
    }

    public isSafeToGoRight(): boolean {
        const position = {
            x: this.head.getPosition().x + 1,
            y: this.head.getPosition().y
        };

        return (this.map.getMapItemsAt(position).length === 0);
    }

    public isSafeToGoDown(): boolean {
        const position = {
            x: this.head.getPosition().x,
            y: this.head.getPosition().y + 1
        };

        return (this.map.getMapItemsAt(position).length === 0);
    }

    public getHead(): Head {
        return this.head;
    }

    private moveHead(): void {
        const futurePosition: MapPosition = {
            x: this.head.getPosition().x + this.velocity.x,
            y: this.head.getPosition().y + this.velocity.y
        };

        if (this.map.getMapItemsAt(futurePosition).length === 0) {
            this.head.move(this.velocity);
        } else if (this.isMoving()) {
            this.kindaDie();
        }
    }

    private kindaDie(): void {
        // TODO: This isn't Angleworms II at all, but while it's still not playable game, it's kind of fun. Remove this crap later.
        const newColor = `#${Math.floor(Math.random()*8+2)}${Math.floor(Math.random()*8+2)}${Math.floor(Math.random()*8+2)}`;
        this.size -= 2;
        this.setColor(newColor);
    }

    private setColor(color: Color) {
        this.color = color;
        this.head.setColor(this.color);
    }

    private updateTail(): void {
        this.spawnTail();
        this.removeDeadTail();
        this.growSize();
    }

    private spawnTail(): void {
        const tail = new Tail();
        const position: MapPosition = {
            x: this.head.getPosition().x,
            y: this.head.getPosition().y
        };

        tail.setPosition(position);
        tail.setColor(this.color);
        this.tail.push(tail);
    }

    private removeDeadTail(): void {
        if (this.tail.length > this.size) {
            for(let i = 0; this.tail.length - this.size; i++) {
                const removedTailPiece: Tail = this.tail.shift();
                this.map.removeMapItem(removedTailPiece);
            }
        }
    }

    private growSize(): void {
        if (this.isMoving() && this.ticksLived % 4 == 0) {
            this.size++;
        }
    }

    private drawHead(): void {
        this.head.draw();
    }

    private drawTail(): void {
        for(let i = 0; i < this.tail.length; i++) {
            this.tail[i].draw();
        }
    }

    private initHead(): void {
        this.head = new Head();
        let startPosition = {
            x: Math.floor(this.mapSize.width / 2),
            y: Math.floor(this.mapSize.height / 2)
        };
        this.head.setPosition(startPosition);
        this.head.setColor(this.color);

    }
}