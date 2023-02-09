import { Circle } from './circle';
import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';

describe('Circle component testing', () => {
    it('renders without letter', () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders with letter", () => {
        const tree = renderer
            .create(<Circle letter="test"/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders with head", () => {
        const tree = renderer
            .create(<Circle head="1"/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders with react-element in head", () => {
        const tree = renderer
            .create(<Circle head={<Circle />}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders with tail", () => {
        const tree = renderer
            .create(<Circle tail="1"/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders with react-element in tail", () => {
        const tree = renderer
            .create(<Circle tail={<Circle />}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders with index", () => {
        const tree = renderer
            .create(<Circle index={1}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders with prop isSmall === true", () => {
        const tree = renderer
            .create(<Circle isSmall={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders with dafault state", () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Default} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders with changing state", () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Changing} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("renders with modified state", () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Modified} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

})