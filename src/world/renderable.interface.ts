import AnyRepresentation from '../renderers/any-representation.type';

interface Renderable {
    getRepresentation: (representationName: string) => AnyRepresentation;
}

export default Renderable;
