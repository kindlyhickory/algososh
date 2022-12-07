import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css"
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {ElementStates} from "../../types/element-states";
import {Queue} from "../../data-structures/queue";
import {delay} from "../../utils/utils";
import {Circle} from "../ui/circle/circle";
import {useForm} from "../../hooks/useForm";

type TQueueElem = {
  value?: string;
  color: ElementStates;
  head?: string;
};

export const QueuePage: React.FC = () => {

  const [startQueue] = useState(Array.from({ length: 7 }, () => ({ value: '', color: ElementStates.Default })));

  const {values, handleChange, setValues} = useForm({queueInput: ''});

  const [queue, setQueue] = useState(new Queue<TQueueElem>(7));

  const [queueArr, setQueueArr] = useState<TQueueElem[]>(startQueue);
  const [disableButtons, setDisableButtons] = useState(false);

  // const [inputVal, setInputVal] = useState('');

  // const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputVal(e.target.value);
  // };

  const enqArr = (value: string, color: ElementStates) => {
    queueArr[queue.getTail() - 1] = {value: value, color: color}
    setQueueArr([...queueArr]);
  }

  const handleAdd = async () => {
    if (values.queueInput) {
      queue.enqueue({value: values.queueInput, color: ElementStates.Default});
      setQueue(queue);
      enqArr('', ElementStates.Changing)
      await delay(500);
      enqArr(values.queueInput, ElementStates.Changing)
      enqArr(values.queueInput, ElementStates.Default)
      setValues({...values, queueInput: ''});
    }
  }

  const deqArr = (value: string | undefined, color: ElementStates, head?:string) => {
    queueArr[queue.getHead() - 1] = { value: value, color: color };
    setQueueArr([...queueArr]);
  }
  const handleRemove = async () => {
    setDisableButtons(true);
    queue.dequeue();
    setQueue(queue);
    deqArr(queueArr[queue.getHead() - 1].value, ElementStates.Changing)
    await delay(300);
    deqArr('', ElementStates.Default)
    if (queue.getHead() === 7 && queue.getTail() === 7 && queue.isEmpty()) {
      deqArr('', ElementStates.Default, 'head');
    }
    setDisableButtons(false);
  }

  const handleReset = () => {
    queue.clear()
    setQueue(queue);
    setQueueArr(Array.from({ length: 7 }, () => ({ value: '', color: ElementStates.Default })));
  }
  return (
    <SolutionLayout title="Очередь">
      <div className={styles.manageContainer}>
        <div className={styles.manageContainer__queueButtons}>
          <Input
              extraClass={styles.input}
              onChange={handleChange}
              isLimitText={true}
              type="text"
              value={values.queueInput}
              maxLength={4}
              name="queueInput"
          />
          <Button
              extraClass={styles.addButton}
              text='Добавить'
              disabled={!values.queueInput || disableButtons}
              onClick={handleAdd}
              data-testid='add-button'
          />
          <Button
              extraClass={styles.removeButton}
              text='Удалить'
              disabled={queue.isEmpty() || disableButtons}
              onClick={handleRemove}
              data-testid='remove-button'
          />
        </div>
        <Button
            disabled={(!queue.getHead() && !queue.getTail()) || disableButtons}
            text="Очистить"
            onClick={handleReset}
            data-testid='reset-button'
        />
      </div>
      <ul className={styles.circlesContainer} >
        {queueArr && queueArr.slice(0, 7).map((item, index) =>
            <li key={index}>
              <Circle
                  letter={item.value}
                  index={index}
                  head={(index === queue.getHead() && !queue.isEmpty()) || item.head ? 'head' : ''}
                  tail={(index === queue.getTail() - 1 && !queue.isEmpty()) ? 'tail' : ''}
                  state={item.color}
                   />
            </li>)}
      </ul>
    </SolutionLayout>
  );
};
