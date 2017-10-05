import * as _ from 'lodash';
import Dimensions from './dimensions.type';
import Apple from './world-object/apple';
import WorldObject from './world-object/world-object';
import WorldPosition from './world-position.type';
import World from './world.interface';

export default class WorldImpl implements World {
    private size: Dimensions;
    private worldObjects: WorldObject[][][];

    public constructor(size: Dimensions = {width: 20, height: 20}) {
        this.size = size;
        this.resetWorldObjects();
    }

    public getSize(): Dimensions {
        return this.size;
    }

    public addWorldObject(worldObject: WorldObject): void {
        const position: WorldPosition = worldObject.getPosition();
        this.worldObjects[position.x][position.y].push(worldObject);
    }

    public moveWorldObject(worldObject: WorldObject, worldPosition: WorldPosition): void {
        const oldPosition: WorldPosition = worldObject.getPosition();
        const removed: WorldObject[] = _.remove(this.worldObjects[oldPosition.x][oldPosition.y], worldObject);
        if (removed.length) {
            worldObject.setPosition(worldPosition);
            this.worldObjects[worldPosition.x][worldPosition.y].push(worldObject);
        } else {
            throw new Error(`Trying to move WorldObject that doesn't exist anymore`);
        }
    }

    public removeWorldObject(worldObject: WorldObject): void {
        const position = worldObject.getPosition();
        _.remove(this.worldObjects[position.x][position.y], worldObject);
    }

    public getWorldObjects(itemTypes?: string[]): WorldObject[] {
        const itemsAtPosition: WorldObject[] = _.flattenDeep<WorldObject>(this.worldObjects);

        return this.filterWorldObjectsByTypes(itemsAtPosition, itemTypes);
    }

    public getWorldObjectsAt(worldPosition: WorldPosition, itemTypes?: string[]): WorldObject[] {
        worldPosition.x = (this.size.width + worldPosition.x) % this.size.width;
        worldPosition.y = (this.size.height + worldPosition.y) % this.size.height;
        const worldObjects: WorldObject[] = this.worldObjects[worldPosition.x][worldPosition.y];

        return this.filterWorldObjectsByTypes(worldObjects, itemTypes);
    }

    public removeWorldObjectsAt(worldPosition: WorldPosition, types?: string[]): void {
        const worldObjects: WorldObject[] = this.getWorldObjectsAt(worldPosition, types);
        for (const worldObject of worldObjects) {
            this.removeWorldObject(worldObject);
        }
    }

    public getRandomEmptyPosition(): WorldPosition {
        const emptyPositions: WorldPosition[] = [];
        for (let x = 0; x < this.size.width; x++) {
            for (let y = 0; y < this.size.height; y++) {
                if (this.worldObjects[x][y].length === 0) {
                    const position: WorldPosition = { x, y };
                    emptyPositions.push(position);
                }
            }
        }

        if (emptyPositions.length === 0) {
            return null;
        }

        const randomIndex: number = _.random(0, emptyPositions.length - 1);

        return emptyPositions[randomIndex];
    }

    public update(): void {
        const worldObjects: WorldObject[] = this.getWorldObjects();
        worldObjects.forEach((worldObject) => {
            worldObject.update();
        });
    }

    public spawnApple() {
        const apple = new Apple({
            position: this.getRandomEmptyPosition(),
        });
    }

    private resetWorldObjects() {
        this.worldObjects = [];
        for (let x = 0; x < this.size.width; x++) {
            this.worldObjects[x] = [];
            for (let y = 0; y < this.size.width; y++) {
                this.worldObjects[x][y] = [];
            }
        }
    }

    private filterWorldObjectsByTypes(worldObjects: WorldObject[], itemTypes: string[]): WorldObject[] {
        if (itemTypes === undefined) {
            return worldObjects;
        }

        return worldObjects.filter((worldObject: WorldObject) => {
            let foundType: boolean = false;
            for (const itemType of itemTypes) {
                if (worldObject.getType() === itemType) {
                    foundType = true;
                    break;
                }
            }
            return foundType;
        });
    }
}
