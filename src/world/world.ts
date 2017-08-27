import Color from '../renderers/color.type';
import Dimensions from './dimensions.type';
import WorldItem from './world-item/world-item';
import WorldPosition from './world-position.type';
import World from './world.interface';

export default class WorldImpl implements World {
    private size: Dimensions;
    private backgroundColor: Color;
    private worldItems: WorldItem[];

    public constructor(size: Dimensions = {width: 20, height: 20}) {
        this.size = size;
        this.backgroundColor = '#000';
        this.worldItems = [];
    }

    public getSize(): Dimensions {
        return this.size;
    }

    public addWorldItem(worldItem: WorldItem): void {
        this.worldItems.push(worldItem);
    }

    public removeWorldItem(worldItem: WorldItem): void {
        const index: number = this.worldItems.indexOf(worldItem);
        this.worldItems.splice(index, 1);
    }

    public getWorldItems() {
        return this.worldItems;
    }

    public getWorldItemsAt(worldPosition: WorldPosition): WorldItem[] {
        worldPosition.x = (this.size.width + worldPosition.x) % this.size.width;
        worldPosition.y = (this.size.height + worldPosition.y) % this.size.height;
        return this.worldItems.filter((worldItem: WorldItem) => {
            return (worldItem.getPosition().x === worldPosition.x &&
                    worldItem.getPosition().y === worldPosition.y);
        });
    }
}
