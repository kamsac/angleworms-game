import * as _ from 'lodash';
import Dimensions from './dimensions.type';
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

    public moveWorldItem(worldItem: WorldItem, position: WorldPosition): void {
        const oldPosition: WorldPosition = worldItem.getPosition();
        _.remove(this.worldItems[oldPosition.x][oldPosition.y], worldItem);
        worldItem.setPosition(position);
        this.worldItems[position.x][position.y].push(worldItem);
    }

    public removeWorldItem(worldItem: WorldItem): void {
        const position = worldItem.getPosition();
        _.remove(this.worldItems[position.x][position.y], worldItem);
    }

    public getWorldItems(): WorldItem[] {
        return _.flattenDeep<WorldItem>(this.worldItems);
    }

    public getWorldItemsAt(worldPosition: WorldPosition): WorldItem[] {
        worldPosition.x = (this.size.width + worldPosition.x) % this.size.width;
        worldPosition.y = (this.size.height + worldPosition.y) % this.size.height;
        return this.worldItems[worldPosition.x][worldPosition.y];
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
}
