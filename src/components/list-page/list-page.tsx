  import React, { ChangeEvent, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './list-page.module.css'
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import {delay, getRandomInt} from "../../utils/utils";
import {LinkedList} from "../../data-structures/list";
  import {useForm} from "../../hooks/useForm";
  import {DELAY_LOW} from "../../constants/constants";

type TItem = {
  value: string;
  color: ElementStates;
};

enum ButtonName {
  AddToHead = "add to head",
  AddToTail = "add to tail",
  DeleteFromTheHead = "delete from the head",
  DeleteFromTheTail = "delete from to tail",
  AddByIndex = "add by index",
  DeleteByIndex = "delete by index",
};

export const ListPage: React.FC = () => {

  const {values, handleChange, setValues} = useForm({listInput: '', indexInput: ''});

  // const [inputValue, setInputValue] = useState('');
  // const [index, setIndex] = useState('');
  const [loading, setLoading] = useState(false);
  const [addToHeadOperation, setAddToHeadOperation] = useState(false);
  const [addToTailOperation, setAddToTailOperation] = useState(false);
  const [deleteFromTheHeadOperation, setDeleteFromTheHeadOperation] = useState(false);
  const [deleteFromTheTailOperation, setDeleteFromTheTailOperation] = useState(false);
  const [addByIndexOperation, setAddByIndexOperation] = useState(false);
  const [deleteByIndexOperation, setDeleteByIndexOperation] = useState(false);
  const [inputValueIndex, setInputValueIndex] = useState<number>();
  const [buttonName, setButtonName] = useState('');
  const [circleTempValue, setCircleTempValue] = useState('');
  
  const list = useMemo(() => {
    return new LinkedList<string>(
        Array.from(
            {length: 4},
            () => (getRandomInt(0, 99).toString())))
  }, []);

  const [arr, setArr] = useState<TItem[]>(list.getArrWithColor());

  // const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };
  //
  // const onIndexChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setIndex(e.target.value);
  // };

  const addToHead = async () => {
    if (values.listInput && list.listLength < 6) {
      setButtonName(ButtonName.AddToHead);
      setLoading(true);
      setInputValueIndex(0);
      setAddToHeadOperation(true);
      await delay(DELAY_LOW);
      list.prepend(values.listInput);
      setAddToHeadOperation(false);
      const newArr = list.getArrWithColor();
      newArr[0].color = ElementStates.Modified;
      setArr(newArr);
      await delay(DELAY_LOW);
      newArr[0].color = ElementStates.Default;
      setArr(newArr);
    }
    setValues({...values, listInput: ''});
    setLoading(false);
    setButtonName('');
  };

  const addToTail = async () => {
    if (values.listInput && list.listLength < 6) {
      setButtonName(ButtonName.AddToTail)
      setLoading(true);
      setInputValueIndex(list.listLength - 1);
      setAddToTailOperation(true);
      await delay(DELAY_LOW);
      list.append(values.listInput);
      setAddToTailOperation(false);
      const newArr = list.getArrWithColor();
      newArr[newArr.length - 1].color = ElementStates.Modified;
      setArr(newArr);
      await delay(DELAY_LOW);
      newArr[newArr.length - 1].color = ElementStates.Default;
      setArr(newArr);
    };
    setValues({...values, listInput: ''});
    setLoading(false);
    setButtonName('');
  };

  const deleteFromTheHead = async () => {
    if (list.listLength > 0) {
      const newArr = list.getArrWithColor();
      setCircleTempValue(newArr[0].value);
      setButtonName(ButtonName.DeleteFromTheHead);
      setLoading(true);
      setDeleteFromTheHeadOperation(true);
      setInputValueIndex(0);
      newArr[0].value = '';
      setArr(newArr);
      await delay(DELAY_LOW);
      list.deleteHead();
      setDeleteFromTheHeadOperation(false);
      setArr(list.getArrWithColor());
    }
    setLoading(false);
    setButtonName('');
  };

  const deleteFromTheTail = async () => {
    if (list.listLength > 0) {
      const newArr = list.getArrWithColor();
      setCircleTempValue(newArr[newArr.length - 1].value);
      setButtonName(ButtonName.DeleteFromTheTail);
      setLoading(true);
      setDeleteFromTheTailOperation(true);
      setInputValueIndex(list.listLength - 1);
      newArr[newArr.length - 1].value = '';
      setArr(newArr);
      await delay(DELAY_LOW);
      list.deleteTail();
      setDeleteFromTheTailOperation(false);
      setArr(list.getArrWithColor());
    };
    setLoading(false);
    setButtonName('');
  };

  const addByIndex = async () => {
    setButtonName(ButtonName.AddByIndex);
    setLoading(true);
    setAddByIndexOperation(true);
    const newArr = list.getArrWithColor();
    for (let i = 0; i <= Number(values.indexInput); i++) {
      setInputValueIndex(i);
      await delay(DELAY_LOW);
      if (i < Number(values.indexInput)) {
        newArr[i].color = ElementStates.Changing;
        setArr(newArr);
      };
    };
    setAddByIndexOperation(false);
    setInputValueIndex(Number(''));
    list.addByIndex(values.listInput, Number(values.indexInput));
    const finalArr = list.getArrWithColor();
    finalArr[Number(values.indexInput)].color = ElementStates.Modified;

    setArr(finalArr);
    await delay(DELAY_LOW);
    finalArr[Number(values.indexInput)].color = ElementStates.Default;
    setArr(finalArr);
    setLoading(false);
    setValues({...values, listInput: ''});
    setValues({...values, indexInput: ''});
    setButtonName('');
  };

  const deleteByIndex = async () => {
    if (Number(values.indexInput) < list.listLength && Number(values.indexInput) < 7) {
      setButtonName(ButtonName.DeleteByIndex);
      setLoading(true);
      const newArr = list.getArrWithColor();
      for (let i = 0; i <= Number(values.indexInput); i++) {
        await delay(DELAY_LOW);
        newArr[i].color = ElementStates.Changing;
        setArr([...newArr]);
      };
      await delay(DELAY_LOW);
      setCircleTempValue(newArr[Number(values.indexInput)].value);
      newArr[Number(values.indexInput)].value = '';
      setDeleteByIndexOperation(true);
      newArr[Number(values.indexInput)].color = ElementStates.Default;
      setInputValueIndex(Number(values.indexInput));
      await delay(DELAY_LOW);
      list.deleteByIndex(Number(values.indexInput));
      setArr(list.getArrWithColor());
      setDeleteByIndexOperation(false);
      setLoading(false);
      setButtonName('');
      setValues({...values, indexInput: ''});
    }
  };

  const showHead = (index: number) => {
    if (index === 0 && !addToHeadOperation && !addByIndexOperation) {
      return 'head';
    } else if (index === 0 && addByIndexOperation && inputValueIndex !== 0) {
      return 'head';
    } else {
      return '';
    };
  };

  const showTail = (index: number) => {
    if (index === arr.length - 1 && !deleteFromTheTailOperation && !deleteByIndexOperation) {
      return 'tail';
    } else if (arr.length === 1) {
      return '';
    } else if (deleteByIndexOperation && index === arr.length - 1) {
      return '';
    } else {
      return '';
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.manageContainer}>
        <div>
          <div className={styles.manageContainer__item}>
            <Input
                extraClass={styles.input}
                placeholder="Введите значение"
                maxLength={4}
                isLimitText={true}
                value={values.listInput}
                onChange={handleChange}
                disabled={loading}
                name="listInput"
                data-testid="input-val"
            />
            <Button
                extraClass={styles.button}
                text="Добавить в head"
                onClick={addToHead}
                isLoader={ loading && buttonName === ButtonName.AddToHead }
                disabled={values.listInput === '' || loading}
                data-testid='add-to-head'
            />
            <Button
                extraClass={styles.button}
                text="Добавить в tail"
                onClick={addToTail}
                isLoader={ loading && buttonName === ButtonName.AddToTail}
                disabled={values.listInput === '' || loading}
                data-testid='add-to-tail'
            />
            <Button
                extraClass={styles.button}
                text="Удалить из head"
                onClick={deleteFromTheHead}
                isLoader={ loading && buttonName === ButtonName.DeleteFromTheHead }
                disabled={ loading || arr.length === 0}
                data-testid='remove-from-head'
            />
            <Button
                extraClass={styles.button}
                text="Удалить из tail"
                onClick={deleteFromTheTail}
                isLoader={ loading && buttonName === ButtonName.DeleteFromTheTail  }
                disabled={ loading || arr.length === 0}
                data-testid='remove-from-tail'
            />
          </div>
          <div className={styles.manageContainer__item}>
            <Input
                extraClass={styles.input}
                placeholder="Введите индекс"
                max={arr.length - 1}
                min='0'
                type="number"
                value={values.indexInput}
                onChange={handleChange}
                disabled={loading}
                name="indexInput"
                data-testid='index-val'
            />
            <Button
                extraClass={styles.indexButton}
                text="Добавить по индексу"
                onClick={addByIndex}
                isLoader={loading && buttonName === ButtonName.AddByIndex }
                disabled={ loading || !values.listInput || !values.indexInput || Number(values.indexInput) > arr.length - 1}
                data-testid="add-to-index"
            />
            <Button
                extraClass={styles.indexButton}
                text="Удалить по индексу"
                onClick={deleteByIndex}
                isLoader={loading && buttonName === ButtonName.DeleteByIndex }
                disabled={loading || values.indexInput === '' || Number(values.indexInput) > arr.length - 1}
                data-testid="remove-from-index"
            />
          </div>
        </div>
      </div>
        <ul className={`${styles.circlesContainer} circles-list`}>
          {arr.map((item, index) =>
            <li className={styles.circleItem} key={index}>
              {loading && (addToHeadOperation || addToTailOperation || addByIndexOperation) && index === inputValueIndex &&
                  <Circle extraClass={`${styles.circle_position_top} small-circle_top`} letter={values.listInput} state={ElementStates.Changing} isSmall data-id='top-circle'/>}
              {loading && (deleteFromTheHeadOperation || deleteFromTheTailOperation || deleteByIndexOperation) && index === inputValueIndex &&
                  <Circle extraClass={`${styles.circle_position_bottom} small-circle_bottom`} letter={circleTempValue} state={ElementStates.Changing} isSmall data-id='bottom-circle'/>}
              {arr.length - 1 !== index &&
                <div className={styles.arrow}>
                  <ArrowIcon/>
                </div>}
                <Circle
                  index={index}
                  letter={item.value}
                  state={item.color}
                  head={showHead(index)}
                  extraClass={styles.circle_size_big}
                  tail={showTail(index)}
                />
            </li>)}
        </ul>
    </SolutionLayout>
  );
};