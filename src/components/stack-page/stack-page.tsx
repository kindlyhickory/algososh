import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import styles from "./stack-page.module.css"
import {ElementStates} from "../../types/element-states";
import {Stack} from "../../data-structures/stack";
import {delay} from "../../utils/utils";
import {Circle} from "../ui/circle/circle";
import {useForm} from "../../hooks/useForm";

type TStackElem = {
  value: string;
  color: ElementStates;
};

export const StackPage: React.FC = () => {
  const {values, handleChange, setValues} = useForm({stackInput: ''});

  const [stackItems, setStackItems] = useState<TStackElem[]>([]);
  const [stack] = useState(new Stack<TStackElem>());

  const setPosition = (index: number, arr: TStackElem[]): string => index === arr.length - 1 ? 'top' : ''
  const handleAdd = async () => {
    if (values.stackInput) {
      stack.push({
        value: values.stackInput,
        color: ElementStates.Changing
      })
      setValues({...values, stackInput: ''});
      setStackItems([...stack.getElements()]);
      await delay(300);
      stack.peek.color = ElementStates.Default;
      setStackItems([...stack.getElements()]);
    }
  }

  const handleReset = () => {
    stack.clear();
    setStackItems([...stack.getElements()]);
  }

  const handleRemove = async () => {
    stack.peek.color = ElementStates.Changing;
    setStackItems([...stack.getElements()]);
    await delay(300);
    stack.pop();
    setStackItems([...stack.getElements()])
  }
  return (
    <SolutionLayout title="Стек">
      <div className={styles.manageContainer}>
        <div className={styles.manageContainer__stackButtons}>
          <Input
            extraClass={styles.input}
            onChange={handleChange}
            isLimitText={true}
            type="text"
            value={values.stackInput}
            maxLength={4}
            name="stackInput"
          />
          <Button
            extraClass={styles.addButton}
            text='Добавить'
            disabled={!values.stackInput}
            onClick={handleAdd}
          />
          <Button
              extraClass={styles.removeButton}
              text='Удалить'
              disabled={!stackItems.length}
              onClick={handleRemove}
          />
        </div>
        <Button
          text="Очистить"
          onClick={handleReset}
          disabled={!stackItems.length}
        />
      </div>
      <ul className={styles.circlesBox} >
        {stackItems && stackItems.map((item, index) =>
            <li key={index}>
              <Circle letter={item.value} state={item.color} index={index} head={setPosition(index, stackItems)} />
            </li>)}
      </ul>
    </SolutionLayout>
  );
};
