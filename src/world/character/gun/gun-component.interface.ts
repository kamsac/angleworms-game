import Character from '../character.interface';

interface GunComponent {
    shoot: (character: Character) => void;
    cleanBullet: () => void;
}

export default GunComponent;
