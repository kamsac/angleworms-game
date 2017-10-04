import AnyRepresentation from '../renderers/any-representation.type';
import Representation from '../renderers/representation.type';

interface Renderable {
    getRepresentation: (representationName?: string) => Representation | AnyRepresentation;
}

export default Renderable;
