import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from './queue.module.css'
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { elementColor,initQueue } from "../../utils/utils";
import { Queue } from "../../classes/Queue";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { LoaderAddDelete } from "../../types/element-states";

export const QUEUE_SIZE = 7;

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>(''); //управляемый инпут
  const [active, setActive] = React.useState<LoaderAddDelete | boolean>(false); //состояние для отключения кнопок во время анимации и спиннера
  const [animation, setAnimation] = React.useState<Array<string[]> | undefined>(initQueue()); //массив элементов стэка для отображения [значение,цвет круга]
  const [queue,setQueue] = React.useState<Queue<string>>(new Queue<string>(QUEUE_SIZE));//записываем queue в состояние, чтобы он сохранялся

  const addButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(LoaderAddDelete.Add);
    queue.enqueue(inputValue);
    setInputValue('');
    queue.getSize() > 0 && setTimeout(() => { setAnimation(newIterationQueue(true,queue.getTail())) }, 0);
    queue.getSize() > 0 && setTimeout(() => { setAnimation(newIterationQueue()); setActive(false) }, SHORT_DELAY_IN_MS);
  }

  const removeButton = () => {
    setActive(LoaderAddDelete.Delete);
    setAnimation(newIterationQueue(true,queue.getHead()));
    queue.dequeue();
    setTimeout(() => { setAnimation(newIterationQueue()); setActive(false) }, SHORT_DELAY_IN_MS);
  }

  const clearButton = () => {
    queue.clear();
    setAnimation(initQueue());
    setActive(false)
  }

  //функция для создания кадра анимации. Если light = true нужно подсветить последний элемент
  const newIterationQueue = (light?: boolean,ind?:number):any | undefined => {

    if (light === undefined) {
      let newIter = queue.getAll().map(function (item) {
        return [item, 'default'];
      });
      return newIter;
    }

    if (light === true) {
      let newIter;
      newIter = queue.getAll().map(function (item, index) {
        let color = 'default';
        if (index === ind) color = 'changing';
        return [item, color];
      });
      return newIter;
    }
  }

  const content = React.useMemo(
    () => {
      return (
        <div className={styles['queue__content']}>
          <form className={styles['queue__input']}>
            <Input
              name={'text'}
              value={inputValue}
              placeholder="Введите текст"
              maxLength={4}
              onChange={event => setInputValue(event.target.value)}
            >
            </Input>
            <Button
              type="submit"
              text='Добавить'
              onClick={addButton}
              disabled={(active || (queue.getTail()===QUEUE_SIZE-1) || !inputValue) ? true : false}
              isLoader={active === LoaderAddDelete.Add ? true : false}>
            </Button>
            <Button
              type="button"
              text='Удалить'
              onClick={removeButton}
              disabled={(active || !(queue.getSize()>0))? true : false}
              isLoader={active === LoaderAddDelete.Delete ? true : false}>
            </Button>
            <div className={styles['queue__clear']}>
              <Button
                type="button"
                text='Очистить'
                onClick={clearButton}
                disabled={(active || (queue.getSize()===0 && queue.getHead()===0)) ? true : false}>
              </Button>
            </div>
          </form>

          {animation &&
            <div className={styles['queue__result']}>
              {animation.map((iter,index) => {
                return <Circle 
                state={elementColor(iter[1])} 
                letter={iter[0]}
                head={queue.getHead()===index && (queue.getSize()>0 || queue.getHead() !==0) ? 'head' : ''}
                tail={queue.getTail()===index && iter[0] ? 'tail' : ''} 
                index={index} 
                key={Math.random()}></Circle>
              })}
            </div>
          }

        </div>
      )
    }, [inputValue, animation, active]
  );

  return (
    <SolutionLayout title="Очередь">
      {content}
    </SolutionLayout>
  );
};
