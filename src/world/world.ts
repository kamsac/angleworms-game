import * as _ from 'lodash';
import Dimensions from './dimensions.type';
import Apple from './world-item/apple';
import WorldItem from './world-item/world-item';
import WorldPosition from './world-position.type';
import World from './world.interface';

export default class WorldImpl implements World {
    private size: Dimensions;
    private worldItems: WorldItem[][][];

    public constructor(size: Dimensions = {width: 20, height: 20}) {
        this.size = size;
        this.resetWorldItems();
    }

    public getSize(): Dimensions {
        return this.size;
    }

    public addWorldItem(worldItem: WorldItem): void {
        const position: WorldPosition = worldItem.getPosition();
        this.worldItems[position.x][position.y].push(worldItem);
    }

    public moveWorldItem(worldItem: WorldItem, worldPosition: WorldPosition): void {
        const oldPosition: WorldPosition = worldItem.getPosition();
        _.remove(this.worldItems[oldPosition.x][oldPosition.y], worldItem);
        worldItem.setPosition(worldPosition);
        this.worldItems[worldPosition.x][worldPosition.y].push(worldItem);
    }

    public removeWorldItem(worldItem: WorldItem): void {
        const position = worldItem.getPosition();
        _.remove(this.worldItems[position.x][position.y], worldItem);
    }

    public getWorldItems(itemTypes?: string[]): WorldItem[] {
        const itemsAtPosition: WorldItem[] = _.flattenDeep<WorldItem>(this.worldItems);

        return this.filterWorldItemsByTypes(itemsAtPosition, itemTypes);
    }

    public getWorldItemsAt(worldPosition: WorldPosition, itemTypes?: string[]): WorldItem[] {
        worldPosition.x = (this.size.width + worldPosition.x) % this.size.width;
        worldPosition.y = (this.size.height + worldPosition.y) % this.size.height;
        const worldItems: WorldItem[] = this.worldItems[worldPosition.x][worldPosition.y];

        return this.filterWorldItemsByTypes(worldItems, itemTypes);
    }

    public removeWorldItemsAt(worldPosition: WorldPosition, types?: string[]): void {
        const worldItems: WorldItem[] = this.getWorldItemsAt(worldPosition, types);
        for (const worldItem of worldItems) {
            this.removeWorldItem(worldItem);
        }
    }

    public getRandomEmptyPosition(): WorldPosition {
        const emptyPositions: WorldPosition[] = [];
        for (let x = 0; x < this.size.width; x++) {
            for (let y = 0; y < this.size.height; y++) {
                if (this.worldItems[x][y].length === 0) {
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
        for (let x = 0; x < this.size.width; x++) {
            for (let y = 0; y < this.size.height; y++) {
                for (const worldItem of this.worldItems[x][y]) {
                    worldItem.update();
                }
            }
        }
    }

    public spawnApple() {
        const apple = new Apple({
            position: this.getRandomEmptyPosition(),
        });
    }

    private resetWorldItems() {
        this.worldItems = [];
        for (let x = 0; x < this.size.width; x++) {
            this.worldItems[x] = [];
            for (let y = 0; y < this.size.width; y++) {
                this.worldItems[x][y] = [];
            }
        }
    }

    private filterWorldItemsByTypes(worldItems: WorldItem[], itemTypes: string[]): WorldItem[] {
        if (itemTypes === undefined) {
            return worldItems;
        }

        return worldItems.filter((worldItem: WorldItem) => {
            let foundType: boolean = false;
            for (const itemType of itemTypes) {
                if (worldItem.getType() === itemType) {
                    foundType = true;
                    break;
                }
            }
            return foundType;
        });
    }
}
