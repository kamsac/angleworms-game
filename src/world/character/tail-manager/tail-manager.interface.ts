import CharacterTail from '../../world-object/character-tail';
import Character from '../character.interface';

interface TailManager {
    update: (character: Character) => void;
    setSize: (size: number) => void;
    getSize: () => number;
    setGrowSpeed: (speed: number) => void;
    getGrowSpeed: () => number;
    grow: (size: number) => void;
    shrink: (size: number) => void;
    spawnTail: (character: Character) => void;
    removeDeadTail: (character: Character) => void;
    getTailPieces: () => CharacterTail[];
}

export default TailManager;
