import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {delay, getFibonacciNumbers} from "../../utils/utils";
import {Circle} from "../ui/circle/circle";
import {useForm} from "../../hooks/useForm";

export const FibonacciPage: React.FC = () => {

  const {values, handleChange, setValues} = useForm({fibonacciInput: ''});
  const [loader, setLoader] = useState(false);
  // const [inputVal, setInputVal] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true );
  const [fibonacciArr, setFibonacciArr] = useState<Array<number>>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputArr = event.target.value.split('');
    if (inputArr.length > 2 || Number(inputArr[0]) === 0) {
      setIsButtonDisabled(true);
    } else if (Number(inputArr[0]) >= 2 && inputArr.length ===2) {
      setIsButtonDisabled(true)
    } else
      setValues({...values, fibonacciInput: event.target.value});
      setIsButtonDisabled(false);
      if (event.target.value === '') {
        setIsButtonDisabled(true);
      }
  }

  const visualise = async (inputVal: string) => {
    setLoader(true);
    const arr = getFibonacciNumbers(Number(inputVal));
    for (let i = 0; i < arr.length; i++) {
      await delay(400);
      setFibonacciArr(arr.slice(0, i + 1));
    }
    setLoader(false);
  }

  const handleButton = () => {
    if (values.fibonacciInput) {
        visualise(values.fibonacciInput);
      }
    }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <>
        <div className={styles.inputContainer}>
          <Input
              extraClass={styles.inputContainer__input}
              maxLength={19}
              max={19}
              isLimitText={true}
              value={values.fibonacciInput}
              onChange={onChange}
              type="number"
              name="fibonacciInput"
          />
          <Button
              text="Рассчитать"
              disabled={isButtonDisabled}
              isLoader={loader}
              onClick={handleButton}
              type="submit"
          />
        </div>
      </>
      <ul className={styles.fibonacciContainer}>
        {fibonacciArr.map((item, i) =>
            <li key={i}>
              <Circle index={i} letter={item.toString()} />
            </li>)}
      </ul>
    </SolutionLayout>
  );
};
