import GunComponent from './gun-component.interface';

export default class NoneGunComponent implements GunComponent {
    public shoot(): void {
        // nothing!
    }

    public cleanBullet(): void {
        // nothing!
    }
}
