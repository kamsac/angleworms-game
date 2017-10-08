import AnyRepresentation from '../renderers/any-representation.type';
import Representation from '../renderers/representation.type';

interface Renderable {
    setRepresentation: (representationName: string, representationInformation: AnyRepresentation) => void;
    setRepresentationProperty: (representationName: string, representationProperty: string, value: any) => void;
    getRepresentation: (representationName: string) => AnyRepresentation;
    getEveryRepresentation: () => Representation;
}

export default Renderable;
