import Locator from '../../locator';
import Representation from '../../renderers/representation.type';
import Dimensions from '../dimensions.type';
import Velocity from '../velocity.type';
import WorldPosition from '../world-position.type';
import CollisionStyle from './collision-detectors/collision-style.type';
import PlayerCollisionDetectorComponentFactory from './collision-detectors/player-collision-detector-component-factory';
import PlayerCollisionDetectorComponent from './collision-detectors/player-collision-detector-component.interface';
import PlayerImpl from './player';
import PlayerInputComponentFactory from './player-inputs/player-input-component-factory';
import PlayerInputComponent from './player-inputs/player-input-component.interface';
import PlayerInputMethod from './player-inputs/player-input-method.type';
import Player from './player.interface';

export default class PlayerBuilder {
    private representation: Representation;
    private position: WorldPosition;
    private velocity: Velocity;
    private playerInputComponent: PlayerInputComponent;
    private playerCollisionDetectorComponent: PlayerCollisionDetectorComponent;

    private worldSize: Dimensions = Locator.getWorld().getSize();

    public setRepresentation(representationSetName: 'green' | 'blue'): PlayerBuilder {
        switch (representationSetName) {
            case 'green':
                this.representation = {
                    ColorPixel: {
                        color: '#8f0',
                    },
                    Sprite: {
                        spriteName: 'player-green',
                    },
                };
                break;
            case 'blue':
                this.representation = {
                    ColorPixel: {
                        color: '#08f',
                    },
                    Sprite: {
                        spriteName: 'player-blue',
                    },
                };
                break;
            default:
                throw new Error(`No such \`${representationSetName}\` representation set in PlayerBuilder!`);
        }

        return this;
    }

    public setStartingPosition(position: 'left' | 'right' | 'top' | 'bottom'): PlayerBuilder {

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

    public setStartingDirection(direction: 'left' | 'up' | 'right' | 'down'): PlayerBuilder {
        switch (direction) {
            case 'left':
                this.velocity = {x: -1, y: 0};
                break;
            case 'up':
                this.velocity = {x: 0, y: -1};
                break;
            case 'right':
                this.velocity = {x: 1, y: 0};
                break;
            case 'down':
                this.velocity = {x: 0, y: 1};
                break;
            default:
                throw new Error(`Wrong direction \`${direction}\` direction!`);

        }

        return this;
    }

    public setInputMethod(playerInputMethod: PlayerInputMethod): PlayerBuilder {
        this.playerInputComponent = PlayerInputComponentFactory.create(playerInputMethod);

        return this;
    }

    public setCollisionStyle(collisionStyle: CollisionStyle): PlayerBuilder {
        this.playerCollisionDetectorComponent = PlayerCollisionDetectorComponentFactory.create(collisionStyle);

        return this;
    }

    public build(): Player {
        this.throwErrorsForNotSetProperties();

        return new PlayerImpl({
                representation: this.representation,
                position: this.position,
                velocity: this.velocity,
                input: this.playerInputComponent,
                collisionDetector: this.playerCollisionDetectorComponent,
            });
    }

    private throwErrorsForNotSetProperties(): void {
        if (!this.representation) {
            throw new Error('Representation has to be set.');
        }

        if (!this.position) {
            throw new Error('Starting position has to be set.');
        }

        if (!this.velocity) {
            throw new Error('Starting direction has to be set.');
        }

        if (!this.playerInputComponent) {
            throw new Error('Input method has to be set.');
        }

        if (!this.playerCollisionDetectorComponent) {
            throw new Error('Collision style has to be set.');
        }
    }
}
