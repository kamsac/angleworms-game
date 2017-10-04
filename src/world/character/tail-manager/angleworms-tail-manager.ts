import Locator from '../../../locator';
import Representation from '../../../renderers/representation.type';
import Time from '../../../time';
import CharacterTail from '../../world-item/character-tail';
import WorldItemInitialSettings from '../../world-item/world-item-initial-settings.type';
import WorldPositionHelper from '../../world-position-helper';
import WorldPosition from '../../world-position.type';
import World from '../../world.interface';
import Character from '../character.interface';
import TailManager from './tail-manager.interface';

export default class AnglewormsTailManager implements TailManager {
    private size: number;
    private ticksSinceGrow: number;
    private growSpeed: number;
    private tailPieces: CharacterTail[];
    private world: World;

    public constructor() {
        this.size = 0;
        this.ticksSinceGrow = 0;
        this.growSpeed = 0;
        this.tailPieces = [];
        this.world = Locator.getWorld();
    }

    public update(character: Character): void {
        if (this.ticksSinceGrow++ >= Time.secondsToTicks(this.growSpeed)) {
            if (character.isMoving()) {
                this.size++;
            }

            this.ticksSinceGrow = 0;
        }
    }

    public setSize(size: number): void {
        this.size = size;
    }

    public getSize(): number {
        return this.size;
    }

    public grow(size: number = 1) {
        this.size += size;
    }

    public shrink(size: number = 1) {
        this.size -= size;
    }

    public setGrowSpeed(speed: number): void {
        this.growSpeed = speed;
    }

    public getGrowSpeed(): number {
        return this.growSpeed;
    }

    public spawnTail(character: Character): void {
        const tailRepresentation: Representation =
            JSON.parse(JSON.stringify(character.getHead().getRepresentation()));
        tailRepresentation.Sprite.spriteName += '-tail';

        const position: WorldPosition = {
            x: character.getHead().getPosition().x,
            y: character.getHead().getPosition().y,
        };

        const tailInitialSettings: WorldItemInitialSettings = {
            representation: tailRepresentation,
            position: position,
        };

        const tail = new CharacterTail(tailInitialSettings);

        tail.move(WorldPositionHelper.getAdjacentPastPosition(position, character.getHead().getVelocity()));
        this.tailPieces.push(tail);
    }

    public removeDeadTail(): void {
        if (this.tailPieces.length > this.size) {
            for (let i = 0; this.tailPieces.length - this.size; i++) {
                const removedTailPiece: CharacterTail = this.tailPieces.shift();
                this.world.removeWorldItem(removedTailPiece);

                this.world.removeWorldItemsAt(removedTailPiece.getPosition(), [
                    'character-tail',
                    'wall',
                ]);
            }
        }
    }
}
