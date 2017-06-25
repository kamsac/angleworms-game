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

export default class Player implements IDrawable {
    private velocity: Velocity;
    private color: Color;
    private head: Head;
    private tail: Tail[];
    private size: number;
    private inputBindings: PlayerInputBindings;
    private mapSize: Dimensions;

    public constructor() {
        this.color = '#0f0';
        this.velocity = {
            x: 0,
            y: 0
        };
        this.tail = [];
        this.size = 5;
        this.mapSize = Locator.getMap().getSize();
        this.initInputBindings();
        this.initHead();

        this.handlePlayerInput();
    }

    public update(): void {
        this.updateTail();
        this.moveHead();
    }

    public draw(): void {
        this.drawTail();
        this.drawHead();
    }

    private moveHead(): void {
        this.head.move(this.velocity);
    }

    private updateTail(): void {
        this.spawnTail();
        this.removeDeadTail();
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
                this.tail.shift();
            }
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