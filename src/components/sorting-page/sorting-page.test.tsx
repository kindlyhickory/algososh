import {ElementStates} from "../../types/element-states";
import {bubbleSort, selectionSort} from "./sorting-page";
import {Direction} from "../../types/direction";

const oneLengthArray = [
    {
        value: 10,
        color: ElementStates.Default
    }
]

const startArray = [
    { value: 0, color: ElementStates.Modified },
    { value: 1000, color:ElementStates.Modified },
    { value: 10, color:ElementStates.Modified },
    { value: 50, color:ElementStates.Modified },
    { value: 25, color:ElementStates.Modified },
    { value: 125, color:ElementStates.Modified }
]

const endArrayAsc = [
    { value: 0, color: ElementStates.Modified },
    { value: 10, color:ElementStates.Modified },
    { value: 25, color:ElementStates.Modified },
    { value: 50, color:ElementStates.Modified },
    { value: 125, color:ElementStates.Modified },
    { value: 1000, color:ElementStates.Modified }
]

const endArrayDesc = [
    { value: 1000, color: ElementStates.Modified },
    { value: 125, color:ElementStates.Modified },
    { value: 50, color:ElementStates.Modified },
    { value: 25, color:ElementStates.Modified },
    { value: 10, color:ElementStates.Modified },
    { value: 0, color:ElementStates.Modified }
]

const setSortArray = jest.fn();
const setIsDisabledButton = jest.fn();

jest.setTimeout(25000);

describe('select sort asc algorithm', () => {
    it('works correct with empty arr', async () => {
        await selectionSort([], Direction.Ascending, setIsDisabledButton, setSortArray)
        expect(setSortArray).toHaveBeenCalledTimes(0);
    })

    it('works correct with one element', async () => {
        await selectionSort(oneLengthArray, Direction.Ascending, setIsDisabledButton, setSortArray)
        expect(setSortArray).toHaveBeenCalledTimes(0);
    })

    it('works correct with few elements', async () => {
        await selectionSort(startArray, Direction.Ascending, setIsDisabledButton, setSortArray)
        expect(setSortArray).toHaveBeenLastCalledWith(endArrayAsc);
    })
})

describe('select sort desc algorithm', () => {
    it('works correct with empty arr', async () => {
        await selectionSort([], Direction.Descending, setIsDisabledButton, setSortArray)
        expect(setSortArray).toHaveBeenCalledTimes(0);
    })

    it('works correct with one element', async () => {
        await selectionSort(oneLengthArray, Direction.Descending, setIsDisabledButton, setSortArray)
        expect(setSortArray).toHaveBeenCalledTimes(0);
    })

    it('works correct with few elements', async () => {
        await selectionSort(startArray, Direction.Descending, setIsDisabledButton, setSortArray)
        expect(setSortArray).toHaveBeenLastCalledWith(endArrayDesc);
    })
})

describe('bubble sort asc algorithm', () => {
    it('works correctly with empty arr', async () => {
        await bubbleSort([], Direction.Ascending, setIsDisabledButton, setSortArray);
        expect(setSortArray).toHaveBeenCalledTimes(0);
    })

    it('works correctly with one element', async () => {
        await bubbleSort(oneLengthArray, Direction.Ascending, setIsDisabledButton, setSortArray);
        expect(setSortArray).toHaveBeenCalledTimes(0);
    })

    it('works correctly with some elements', async () => {
        await bubbleSort(startArray, Direction.Ascending, setIsDisabledButton, setSortArray);
        expect(setSortArray).toHaveBeenLastCalledWith(endArrayAsc);
    })
})


describe('bubble sort desc algorithm', () => {
    it('works correctly with empty arr', async () => {
        await bubbleSort([], Direction.Descending, setIsDisabledButton, setSortArray);
        expect(setSortArray).toHaveBeenCalledTimes(0);
    })

    it('works correctly with one element', async () => {
        await bubbleSort(oneLengthArray, Direction.Descending, setIsDisabledButton, setSortArray);
        expect(setSortArray).toHaveBeenCalledTimes(0);
    })

    it('works correctly with some elements', async () => {
        await bubbleSort(startArray, Direction.Descending, setIsDisabledButton, setSortArray);
        expect(setSortArray).toHaveBeenLastCalledWith(endArrayDesc);
    })
})
