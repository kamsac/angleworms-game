import WorldObject from '../../../world-object/world-object.interface';
import WorldPosition from '../../../world-position.type';
import Character from '../../character.interface';

export default class AiWorldAnalyser {

    private static distance(worldPosition1: WorldPosition, worldPosition2: WorldPosition): number {
        const distanceX: number = Math.abs(worldPosition1.x - worldPosition2.x);
        const distanceY: number = Math.abs(worldPosition1.y - worldPosition2.y);
        return distanceX + distanceY;
    }

    public getNearestTargetWorldObject(character: Character, itemTypes: string[]): WorldObject | null {
        const targets: WorldObject[] = character.getWorld().getWorldObjects(itemTypes);
        if (targets.length === 0) {
            return null;
        }

        return this.getNearestWorldObject(character, targets);
    }

    private getNearestWorldObject(character: Character, worldObjects: WorldObject[]): WorldObject {
        const characterPosition: WorldPosition = character.getHead().getPosition();

        worldObjects.sort((worldObject1: WorldObject, worldObject2: WorldObject) => {
            const distance1: number = AiWorldAnalyser.distance(characterPosition, worldObject1.getPosition());
            const distance2: number = AiWorldAnalyser.distance(characterPosition, worldObject2.getPosition());

            return distance1 - distance2;
        });

        return worldObjects[0];
    }
}
