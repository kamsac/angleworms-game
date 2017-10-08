import Representation from '../../../renderers/representation.type';
import Time from '../../../time';
import CharacterTail from '../../world-object/character-tail';
import WorldObjectInitialSettings from '../../world-object/world-object-initial-settings.type';
import WorldPositionHelper from '../../world-position-helper';
import WorldPosition from '../../world-position.type';
import Character from '../character.interface';
import TailManager from './tail-manager.interface';

export default class AnglewormsTailManager implements TailManager {
    private size: number;
    private ticksSinceGrow: number;
    private growSpeed: number;
    private tailPieces: CharacterTail[];

    public constructor() {
        this.size = 0;
        this.ticksSinceGrow = 0;
        this.growSpeed = 0;
        this.tailPieces = [];
    }

    public update(character: Character): void {
        if (this.ticksSinceGrow++ >= Time.squaresPerSecondsToTicks(this.growSpeed)) {
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
            JSON.parse(JSON.stringify(character.getHead().getEveryRepresentation()));
        tailRepresentation.Sprite.spriteName += '-tail';

        const position: WorldPosition = {
            x: character.getHead().getPosition().x,
            y: character.getHead().getPosition().y,
        };

        const tailInitialSettings: WorldObjectInitialSettings = {
            representation: tailRepresentation,
            position: position,
            world: character.getWorld(),
        };

        const tail = new CharacterTail(tailInitialSettings);

        tail.move(WorldPositionHelper.getAdjacentPastPosition(position, character.getHead().getVelocity()));
        this.tailPieces.push(tail);
    }

    public removeDeadTail(character: Character): void {
        if (this.tailPieces.length > this.size) {
            for (let i = 0; this.tailPieces.length - this.size; i++) {
                const removedTailPiece: CharacterTail = this.tailPieces.shift();
                character.getWorld().removeWorldObject(removedTailPiece);

                character.getWorld().removeWorldObjectsAt(removedTailPiece.getPosition(), [
                    'character-tail',
                    'wall',
                ]);
            }
        }
    }

    public getTailPieces(): CharacterTail[] {
        return this.tailPieces;
    }
}
