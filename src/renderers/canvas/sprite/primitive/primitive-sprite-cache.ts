import CanvasImageSource from '../../canvas-image-source.type';
import SpritesList from '../sprites-list.type';
import PlayerHeadPrimitiveSpriteMaker from './sprite-makers/player-head-primitive-sprite-maker';
import PlayerTailPrimitiveSpriteMaker from './sprite-makers/player-tail-primitive-sprite-maker';
import UnknownPrimitiveSpriteMaker from './sprite-makers/unknown-primitive-sprite-maker';

export default class PrimitiveSpriteCache {
    private static sprites: SpritesList = {};

    public static getSprite(spriteName: string): CanvasImageSource {
        if (!PrimitiveSpriteCache.sprites[spriteName]) {
            PrimitiveSpriteCache.loadSprite(spriteName);
        }

        return PrimitiveSpriteCache.sprites[spriteName];
    }

    private static loadSprite(spriteName): void {
        let sprite: CanvasImageSource;
        switch (spriteName) {
            case 'generic-map-item':
                sprite = (new UnknownPrimitiveSpriteMaker()).getSprite();
                break;
            case 'player-green-head':
                sprite = (new PlayerHeadPrimitiveSpriteMaker('#0f0')).getSprite();
                break;
            case 'player-green-tail':
                sprite = (new PlayerTailPrimitiveSpriteMaker('#0f0')).getSprite();
                break;
            case 'player-blue-head':
                sprite = (new PlayerHeadPrimitiveSpriteMaker('#08f')).getSprite();
                break;
            case 'player-blue-tail':
                sprite = (new PlayerTailPrimitiveSpriteMaker('#08f')).getSprite();
                break;
            default:
                sprite = (new UnknownPrimitiveSpriteMaker()).getSprite();
                break;
        }

        PrimitiveSpriteCache.sprites[spriteName] = sprite;
    }
}
