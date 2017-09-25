import Locator from '../../../../locator';
import WorldItem from '../../../world-item/world-item.interface';
import WorldPosition from '../../../world-position.type';
import World from '../../../world.interface';
import Character from '../../character.interface';

export default class AiWorldAnalyser {

    private world: World;

    public constructor() {
        this.world = Locator.getWorld();
    }

    private static distance(worldPosition1: WorldPosition, worldPosition2: WorldPosition): number {
        const distanceX: number = Math.abs(worldPosition1.x - worldPosition2.x);
        const distanceY: number = Math.abs(worldPosition1.y - worldPosition2.y);
        return distanceX + distanceY;
    }

    public getNearestTargetWorldItem(character: Character, itemTypes: string[]): WorldItem | null {
        const targets: WorldItem[] = this.world.getWorldItems(itemTypes);
        if (targets.length === 0) {
            return null;
        }

        return this.getNearestWorldItem(character, targets);
    }

    private getNearestWorldItem(character: Character, worldItems: WorldItem[]): WorldItem {
        const characterPosition: WorldPosition = character.getHead().getPosition();

        worldItems.sort((worldItem1, worldItem2: WorldItem) => {
            const distance1: number = AiWorldAnalyser.distance(characterPosition, worldItem1.getPosition());
            const distance2: number = AiWorldAnalyser.distance(characterPosition, worldItem2.getPosition());

            return distance1 - distance2;
        });

        return worldItems[0];
    }
}
