import * as _ from 'lodash';
import Character from '../character/character.interface';
import Dimensions from '../dimensions.type';
import WorldPosition from '../world-position.type';
import World from '../world.interface';
import Wall from './wall';

export default class WallSpawner {
    private world: World;
    private worldSize: Dimensions;

    public constructor(world: World) {
        this.world = world;
        this.worldSize = world.getSize();
    }

    public spawnBorderWalls(): WallSpawner {
        for (let x = 0; x < this.worldSize.width; x++) {
            const topWall: Wall = new Wall({
                position: {
                    x: x,
                    y: 0,
                },
            });
            const bottomWall: Wall = new Wall({
                position: {
                    x: x,
                    y: this.worldSize.height - 1,
                },
            });
        }

        for (let y = 1; y < this.worldSize.height - 1; y++) {
            const leftWall: Wall = new Wall({
                position: {
                    x: 0,
                    y: y,
                },
            });
            const rightWall: Wall = new Wall({
                position: {
                    x: this.worldSize.width - 1,
                    y: y,
                },
            });
        }

        return this;
    }

    public spawnRandomRectanglesWalls(): WallSpawner {
        const minGroups: number = 2;
        const maxGroups: number = 8;
        const groupsCount = _.random(minGroups, maxGroups);

        const minGroupWidth: number = 1;
        const maxGroupWidth: number = Math.max(2, Math.floor(this.worldSize.width / 5));
        const minGroupHeight: number = 1;
        const maxGroupHeight: number = Math.max(2, Math.floor(this.worldSize.height / 5));

        for (let i = 0; i < groupsCount; i++) {
            const groupWidth: number = _.random(minGroupWidth, maxGroupWidth);
            const groupHeight: number = _.random(minGroupHeight, maxGroupHeight);

            const maxX: number = (this.worldSize.width - 1) - groupWidth;
            const maxY: number = (this.worldSize.height - 1) - groupHeight;

            const startX: number = _.random(0, maxX);
            const startY: number = _.random(0, maxY);

            for (let x = startX, endX = (startX + groupWidth); x < endX; x++) {
                for (let y = startY, endY = (startY + groupHeight); y < endY; y++) {
                    const wall: Wall = new Wall({
                        position: { x, y },
                    });
                }
            }
        }

        return this;
    }

    public removeWallsOnCharactersWay(characters: Character[]): WallSpawner {
        for (const character of characters) {
            const characterPosition: WorldPosition = character.getHead().getPosition();
            const isMovingX = character.isMovingLeft() || character.isMovingRight();
            const isMovingY = character.isMovingUp() || character.isMovingDown();

            if (isMovingX) {
                for (let x = 0; x < this.worldSize.width; x++) {
                    const position: WorldPosition = {
                        x: x,
                        y: characterPosition.y,
                    };
                    this.world.removeWorldItemsAt(position, ['wall']);
                }
            }

            if (isMovingY) {
                for (let y = 0; y < this.worldSize.height; y++) {
                    const position: WorldPosition = {
                        x: characterPosition.x,
                        y: y,
                    };
                    this.world.removeWorldItemsAt(position, ['wall']);
                }
            }
        }

        return this;
    }
}
