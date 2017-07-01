import IDrawable from "../interfaces/drawable.interface";
import Head from "./head";
import PlayerInputBindings from "../types/player-input-bindings.type";
import Velocity from "../types/velocity.type";
import Dimensions from "../types/dimensions.type";
import Locator from "./locator";
import Color from "../types/color.type";
import Tail from "./tail";
import MapPosition from "../types/map-position.type";
import PlayerCheatInputBindings from "../types/player-cheat-input-bindings.type";
import IMap from "../interfaces/map.interface";

export default class Player implements IDrawable {
    private velocity: Velocity;
    private color: Color;
    private head: Head;
    private tail: Tail[];
    private size: number;
    private inputBindings: PlayerInputBindings;
    private mapSize: Dimensions;
    private map: IMap;
    private ticksLived: number;

    public constructor() {
        this.color = '#0f0';
        this.velocity = {
            x: 0,
            y: 0
        };
        this.tail = [];
        this.size = 0;
        this.ticksLived = 0;
        this.mapSize = Locator.getMap().getSize();
        this.map = Locator.getMap();
        this.initInputBindings();
        this.initHead();

        this.handlePlayerInput();
    }

    public update(): void {
        this.updateTail();
        this.moveHead();

        this.ticksLived++;
    }

    public draw(): void {
        this.drawTail();
        this.drawHead();
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

    private isMoving(): boolean {
        return (this.velocity.x !== 0 ||
                this.velocity.y !== 0);
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

    private initInputBindings(): void {
        const cheatInputBindings: PlayerCheatInputBindings = {
            growTail: '1',
            shrinkTail: '2'
        };

        this.inputBindings = {
            left: 'ArrowLeft',
            up: 'ArrowUp',
            right: 'ArrowRight',
            down: 'ArrowDown',
            cheat: cheatInputBindings
        }
    }

    private handlePlayerInput(): void {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            let key: string = event.key;
            switch(key) {
                case this.inputBindings.left:
                    this.velocity = {x: -1, y: 0};
                    break;
                case this.inputBindings.up:
                    this.velocity = {x: 0, y: -1};
                    break;
                case this.inputBindings.right:
                    this.velocity = {x: 1, y: 0};
                    break;
                case this.inputBindings.down:
                    this.velocity = {x: 0, y: 1};
                    break;
                case this.inputBindings.cheat.growTail:
                    this.size++;
                    break;
                case this.inputBindings.cheat.shrinkTail:
                    if (this.size > 0) {
                        this.size--;
                    }
                    break;
            }
        }, false);
    };
}