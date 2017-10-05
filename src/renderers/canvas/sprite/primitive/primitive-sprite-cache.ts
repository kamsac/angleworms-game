import CanvasImageSource from '../../canvas-image-source.type';
import SpritesList from '../sprites-list.type';
import CharacterHeadPrimitiveSpriteMaker from './sprite-makers/character-head-primitive-sprite-maker';
import CharacterTailPrimitiveSpriteMaker from './sprite-makers/character-tail-primitive-sprite-maker';
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
            case 'generic-world-object':
                sprite = (new UnknownPrimitiveSpriteMaker()).getSprite();
                break;
            case 'character-green-head':
                sprite = (new CharacterHeadPrimitiveSpriteMaker('#0f0')).getSprite();
                break;
            case 'character-green-tail':
                sprite = (new CharacterTailPrimitiveSpriteMaker('#0f0')).getSprite();
                break;
            case 'character-blue-head':
                sprite = (new CharacterHeadPrimitiveSpriteMaker('#08f')).getSprite();
                break;
            case 'character-blue-tail':
                sprite = (new CharacterTailPrimitiveSpriteMaker('#08f')).getSprite();
                break;
            default:
                sprite = (new UnknownPrimitiveSpriteMaker()).getSprite();
                break;
        }

        PrimitiveSpriteCache.sprites[spriteName] = sprite;
    }
}
