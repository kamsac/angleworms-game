import AnglewormsGunComponent from './angleworms-gun-component';
import GunComponent from './gun-component.interface';
import GunType from './gun-type.type';
import NoneGunComponent from './none-gun-component';

export default class GunComponentFactory {
    public static create(gunType: GunType): GunComponent {
        switch (gunType) {
            case 'angleworms':
                return new AnglewormsGunComponent();
            case 'none':
                return new NoneGunComponent();
            default:
                throw new Error(`Can't make \`${gunType}\` GunType, but probably should!`);
        }
    }
}
