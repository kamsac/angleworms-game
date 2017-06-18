import IDrawable from "../interfaces/drawable.interface";
import Head from "./head";
import PlayerInputBindings from "../types/player-input-bindings.type";
import Velocity from "../types/velocity.type";
import Dimensions from "../types/dimensions.type";
import Locator from "./locator";
import Color from "../types/color.type";

export default class Player implements IDrawable {
    private velocity: Velocity;
    private color: Color;
    private head: Head;
    private inputBindings: PlayerInputBindings;
    private mapSize: Dimensions;

    public constructor() {
        this.color = '#0f0';
        this.velocity = {
            x: 0,
            y: 0
        };
        this.mapSize = Locator.getMap().getSize();
        this.initInputBindings();
        this.initHead();

        this.handlePlayerInput();
    }

    public update(): void {
        this.head.move(this.velocity);
    }

    public draw(): void {
        this.head.draw();
    }

    private initInputBindings(): void {
        this.inputBindings = {
            left: 'ArrowLeft',
            up: 'ArrowUp',
            right: 'ArrowRight',
            down: 'ArrowDown'
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
            }
        }, false);
    };
}