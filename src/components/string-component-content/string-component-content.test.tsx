import { ElementStates } from '../../types/element-states';
import { swap, reverse } from './string-component-content';


const startArr = [
    { value: '1', color: ElementStates.Default},
    { value: '2', color: ElementStates.Default },
    { value: '3', color: ElementStates.Default },
]

const endArr = [
    { value: '3', color: ElementStates.Default},
    { value: '2', color: ElementStates.Default },
    { value: '1', color: ElementStates.Default },
]

describe('swap testing', () => {
    it('works', () => {
        expect(swap(startArr, 0, 2)).toEqual(endArr);
    })
})

const setStrArr = jest.fn();
const setLoader = jest.fn();

describe('reverse string testing', () => {
    it('reverse with even number characters works correctly', async () => {
        const string = '1234';
        const reversedString = '4321';
        await reverse(string, setStrArr, setLoader, false);
        expect(setStrArr).toHaveBeenLastCalledWith(reversedString.split('').map(val => ({value: val, color: ElementStates.Modified})));
    })

    it('reverse with odd number characters works correctly', async () => {
        const string = '12345';
        const reversedString = '54321';
        await reverse(string, setStrArr, setLoader, false);
        expect(setStrArr).toHaveBeenLastCalledWith(reversedString.split('').map(val => ({value: val, color: ElementStates.Modified})));
    })

    it('reverse with one number characters works correctly', async () => {
        const string = '5';
        const reversedString = '5';
        await reverse(string, setStrArr, setLoader, false);
        expect(setStrArr).toHaveBeenLastCalledWith(reversedString.split('').map(val => ({value: val, color: ElementStates.Modified})));
    })

    it('reverse with zero number characters works correctly', async () => {
        const string = '';
        await reverse(string, setStrArr, setLoader, false);
        expect(setStrArr).toHaveBeenCalledTimes(0);
    })

})