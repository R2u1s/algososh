import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from './stack.module.css'
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { elementColor } from "../../utils/utils";
import { Stack } from "../../classes/Stack";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { LoaderAddDelete } from "../../types/element-states";

export const StackPage: React.FC = () => {

  const [inputValue, setInputValue] = React.useState<string>(''); //управляемый инпут
  const [active, setActive] = React.useState<LoaderAddDelete | boolean>(false); //состояние для отключения кнопок во время анимации и спиннера
  const [animation, setAnimation] = React.useState<Array<string[]> | undefined>([]); //массив элементов стэка для отображения [значение,цвет круга]
  const [stack,setStack] = React.useState<Stack<string>>(new Stack<string>());//записываем стэк в состояние, чтобы он сохранялся

  const addButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(LoaderAddDelete.Add);
    stack.push(inputValue);
    setInputValue('');
    stack.getSize() > 0 && setTimeout(() => { setAnimation(newIterationStack(true)) }, 0);
    stack.getSize() > 0 && setTimeout(() => { setAnimation(newIterationStack()); setActive(false) }, SHORT_DELAY_IN_MS);
  }

  const removeButton = () => {
    setActive(LoaderAddDelete.Delete);
    setAnimation(newIterationStack(true));
    stack.pop();
    setTimeout(() => { setAnimation(newIterationStack()); setActive(false) }, SHORT_DELAY_IN_MS);
  }

  const clearButton = () => {
    stack.clear();
    setAnimation([]);
    setActive(false);
  }

  //функция для создания кадра анимации. Если light = true нужно подсветить последний элемент
  const newIterationStack = (light?: boolean):Array<string[]> | undefined => {

    if (light === undefined) {
      let newIter = stack.getAll().map(function (item) {
        return [item, 'default'];
      });
      return newIter;
    }

    if (light === true) {
      let newIter;
      newIter = stack.getAll().map(function (item, index) {
        let color = 'default';
        if (index === stack.getSize() - 1) color = 'changing';
        return [item, color];
      });
      return newIter;
    }
  }

  const content = React.useMemo(
    () => {
      return (
        <div className={styles['stack__content']}>
          <form className={styles['stack__input']}>
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
              disabled={active || !inputValue ? true : false}
              isLoader={active === LoaderAddDelete.Add ? true : false}>
            </Button>
            <Button
              type="button"
              text='Удалить'
              onClick={removeButton}
              disabled={(active || !(stack.getSize()>0))? true : false}
              isLoader={active === LoaderAddDelete.Delete ? true : false}>
            </Button>
            <div className={styles['stack__clear']}>
              <Button
                type="button"
                text='Очистить'
                onClick={clearButton}
                disabled={(active || !(stack.getSize()>0))? true : false}>
              </Button>
            </div>
          </form>



          {animation &&
            <div className={styles['stack__result']}>
              {animation.map((iter,index) => {
                let head='';
                index === animation.length-1 ? head='top' : head='';
                return <Circle 
                state={elementColor(iter[1])} 
                letter={iter[0]} 
                index={index}
                head={head} 
                key={Math.random()}></Circle>
              })}

            </div>
          }

        </div>
      )
    }, [inputValue, animation, active]
  );

  return (
    <SolutionLayout title="Стек">
      {content}
    </SolutionLayout>
  );
};
