import Locator from '../../locator';
import Representation from '../../renderers/representation.type';
import Dimensions from '../dimensions.type';
import Vector2D from '../vector-2d.type';
import WorldPosition from '../world-position.type';
import CharacterImpl from './character';
import CharacterInputComponentFactory from './character-inputs/character-input-component-factory';
import CharacterInputComponent from './character-inputs/character-input-component.interface';
import CharacterInputMethod from './character-inputs/character-input-method.type';
import Character from './character.interface';
import CharacterCollisionDetectorComponentFactory from './collision-detectors/character-collision-detector-component-factory'; // tslint:disable-line: max-line-length
import CharacterCollisionDetectorComponent from './collision-detectors/character-collision-detector-component.interface'; // tslint:disable-line: max-line-length
import CollisionStyle from './collision-detectors/collision-style.type';
import GunComponentFactory from './gun/gun-component-factory';
import GunComponent from './gun/gun-component.interface';
import GunType from './gun/gun-type.type';

export default class CharacterBuilder {
    private representation: Representation;
    private position: WorldPosition;
    private speed: number;
    private direction: Vector2D;
    private characterInputComponent: CharacterInputComponent;
    private characterCollisionDetectorComponent: CharacterCollisionDetectorComponent;
    private gunComponent: GunComponent;

    private worldSize: Dimensions = Locator.getWorld().getSize();

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

    public setStartingPosition(position: 'left' | 'right' | 'top' | 'bottom'): CharacterBuilder {

        switch (position) {
            case 'left':
                this.position = {
                    x: Math.floor(2),
                    y: Math.floor(this.worldSize.height / 2),
                };
                break;
            case 'right':
                this.position = {
                    x: Math.floor(this.worldSize.width - 2),
                    y: Math.floor(this.worldSize.height / 2),
                };
                break;
            case 'top':
                this.position = {
                    x: Math.floor(this.worldSize.width / 2),
                    y: Math.floor(2),
                };
                break;
            case 'bottom':
                this.position = this.position = {
                    x: Math.floor(this.worldSize.width / 2),
                    y: Math.floor(this.worldSize.height - 2),
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

    public setCollisionStyle(collisionStyle: CollisionStyle): CharacterBuilder {
        this.characterCollisionDetectorComponent = CharacterCollisionDetectorComponentFactory.create(collisionStyle);

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
            position: this.position,
            speed: this.speed,
            direction: this.direction,
            input: this.characterInputComponent,
            collisionDetector: this.characterCollisionDetectorComponent,
            gun: this.gunComponent,
        });
    }

    private throwErrorsForNotSetProperties(): void {
        if (!this.representation) {
            throw new Error('Representation has to be set.');
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

        if (!this.characterCollisionDetectorComponent) {
            throw new Error('Collision style has to be set.');
        }

        if (!this.gunComponent) {
            throw new Error('Gun has to be set');
        }
    }
}
