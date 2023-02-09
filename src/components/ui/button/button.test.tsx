import {Button} from "./button";
import {fireEvent, screen, render} from '@testing-library/react'
import renderer from 'react-test-renderer'

describe('Button testing', () => {
    it('renders with text', () => {
        const tree = renderer
            .create(<Button text='test' />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders without text', () => {
        const tree = renderer
            .create(<Button/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('renders with disabled', () => {
        const tree = renderer
            .create(<Button disabled />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("render with loading indicator", () => {
        const tree = renderer
            .create(<Button isLoader={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Callback works correctly after button click', () => {
        const callBack = jest.fn();
        render(<Button onClick={callBack}/>);
        fireEvent.click(screen.getByRole('button'));
        expect(callBack).toHaveBeenCalled();
    });
});