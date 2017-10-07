import Representation from '../../renderers/representation.type';
import Dimensions from '../dimensions.type';
import Vector2D from '../vector-2d.type';
import WorldPosition from '../world-position.type';
import World from '../world.interface';
import CharacterImpl from './character';
import CharacterInputComponentFactory from './character-inputs/character-input-component-factory';
import CharacterInputComponent from './character-inputs/character-input-component.interface';
import CharacterInputMethod from './character-inputs/character-input-method.type';
import Character from './character.interface';
import CharacterCollisionDetectorComponentFactory from './collision-detectors/character-collision-detector-component-factory'; // tslint:disable-line: max-line-length
import CharacterCollisionDetectorComponent from './collision-detectors/character-collision-detector-component.interface'; // tslint:disable-line: max-line-length
import CollisionStyle from './collision-detectors/collision-style.type';
import CharacterDeathComponent from './death/character-death-component.interface';
import DeathStyle from './death/death-style.type';
import KindaCharacterDeathComponent from './death/kinda-character-death-component';
import RegularCharacterDeathComponent from './death/regular-character-death-component';
import GunComponentFactory from './gun/gun-component-factory';
import GunComponent from './gun/gun-component.interface';
import GunType from './gun/gun-type.type';
import AnglewormsTailManager from './tail-manager/angleworms-tail-manager';
import TailManagerType from './tail-manager/tail-manager-type.type';
import TailManager from './tail-manager/tail-manager.interface';

export default class CharacterBuilder {
    private representation: Representation;
    private position: WorldPosition;
    private world: World;
    private speed: number;
    private direction: Vector2D;
    private characterInputComponent: CharacterInputComponent;
    private tailManager: TailManager;
    private characterCollisionDetectorComponent: CharacterCollisionDetectorComponent;
    private gunComponent: GunComponent;
    private deathComponent: CharacterDeathComponent;

    public setRepresentation(representationSetName: 'green' | 'blue'): CharacterBuilder {
        switch (representationSetName) {
            case 'green':
                this.representation = {
                    ColorPixel: {
                        color: '#8f0',
                    },
                    Sprite: {
                        spriteName: 'character-green',
                    },
                };
                break;
            case 'blue':
                this.representation = {
                    ColorPixel: {
                        color: '#08f',
                    },
                    Sprite: {
                        spriteName: 'character-blue',
                    },
                };
                break;
            default:
                throw new Error(`No such \`${representationSetName}\` representation set in CharacterBuilder!`);
        }

        return this;
    }

    public setWorld(world: World): CharacterBuilder {
        this.world = world;

        return this;
    }

    public setStartingPosition(position: 'left' | 'right' | 'top' | 'bottom'): CharacterBuilder {

        const worldSize: Dimensions = this.world.getSize();

        switch (position) {
            case 'left':
                this.position = {
                    x: Math.floor(2),
                    y: Math.floor(worldSize.height / 2),
                };
                break;
            case 'right':
                this.position = {
                    x: Math.floor(worldSize.width - 2),
                    y: Math.floor(worldSize.height / 2),
                };
                break;
            case 'top':
                this.position = {
                    x: Math.floor(worldSize.width / 2),
                    y: Math.floor(2),
                };
                break;
            case 'bottom':
                this.position = this.position = {
                    x: Math.floor(worldSize.width / 2),
                    y: Math.floor(worldSize.height - 2),
                };
                break;
            default:
                throw new Error(`Wrong \`${position}\` starting position!`);
        }

        return this;
    }

    public setStartingDirection(direction: 'left' | 'up' | 'right' | 'down'): CharacterBuilder {
        switch (direction) {
            case 'left':
                this.direction = { x: -1, y: 0 };
                break;
            case 'up':
                this.direction = { x: 0, y: -1 };
                break;
            case 'right':
                this.direction = { x: 1, y: 0 };
                break;
            case 'down':
                this.direction = { x: 0, y: 1 };
                break;
            default:
                throw new Error(`Wrong \`${direction}\` direction!`);

        }

        return this;
    }

    public setSpeed(speed: number): CharacterBuilder {
        this.speed = speed;

        return this;
    }

    public setInputMethod(characterInputMethod: CharacterInputMethod): CharacterBuilder {
        this.characterInputComponent = CharacterInputComponentFactory.create(characterInputMethod);

        return this;
    }

    public setTailManager(tailManager: TailManagerType): CharacterBuilder {
        switch (tailManager) {
            case 'angleworms':
                this.tailManager = new AnglewormsTailManager();
                break;
            default:
                throw Error(`Wrong \`${tailManager}\` tail manager!`);
        }

        return this;
    }

    public setCollisionStyle(collisionStyle: CollisionStyle): CharacterBuilder {
        this.characterCollisionDetectorComponent = CharacterCollisionDetectorComponentFactory.create(collisionStyle);

        return this;
    }

    public setDeathStyle(deathStyle: DeathStyle): CharacterBuilder {
        switch (deathStyle) {
            case 'regular':
                this.deathComponent = new RegularCharacterDeathComponent();
                break;
            case 'kinda':
                this.deathComponent = new KindaCharacterDeathComponent();
                break;
            default:
                throw Error(`Wrong \`${deathStyle}\` death style!`);
        }

        return this;
    }

    public setGun(gunType: GunType): CharacterBuilder {
        this.gunComponent = GunComponentFactory.create(gunType);

        return this;
    }

    public build(): Character {
        this.throwErrorsForNotSetProperties();

        return new CharacterImpl({
            representation: this.representation,
            world: this.world,
            position: this.position,
            speed: this.speed,
            direction: this.direction,
            input: this.characterInputComponent,
            tailManager: this.tailManager,
            collisionDetector: this.characterCollisionDetectorComponent,
            death: this.deathComponent,
            gun: this.gunComponent,
        });
    }

    private throwErrorsForNotSetProperties(): void {
        if (!this.representation) {
            throw new Error('Representation has to be set.');
        }

        if (!this.world) {
            throw new Error('World has to be set.');
        }

        if (!this.position) {
            throw new Error('Starting position has to be set.');
        }

        if (!this.direction) {
            throw new Error('Starting direction has to be set.');
        }

        if (!this.speed) {
            throw new Error('Speed has to be set.');
        }

        if (!this.characterInputComponent) {
            throw new Error('Input method has to be set.');
        }

        if (!this.tailManager) {
            throw new Error('Tail manager has to be set.');
        }

        if (!this.characterCollisionDetectorComponent) {
            throw new Error('Collision style has to be set.');
        }

        if (!this.deathComponent) {
            throw new Error('Death style has to be set.');
        }

        if (!this.gunComponent) {
            throw new Error('Gun has to be set');
        }
    }
}
