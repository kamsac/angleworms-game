import AnyRepresentation from '../types/any-representation.type';

interface Renderable {
    getRepresentation: (representationName: string) => AnyRepresentation;
}

export default Renderable;
