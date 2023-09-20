import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from './list.module.css'
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { elementColor } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { LinkedList } from "../../classes/LinkedList";
import { initLinkedList, arrowColor, circleSmall } from "../../utils/utils";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LoaderStates } from "../../types/element-states";

export const LIST_SIZE = 5;

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>(''); //управляемый инпут
  const [inputIndexValue, setInputIndexValue] = React.useState<string>('');
  const [active, setActive] = React.useState<LoaderStates | boolean>(false); //состояние для отключения кнопок во время анимации и спиннера
  const [list, setList] = React.useState<LinkedList<string>>(new LinkedList<string>());//записываем list в состояние, чтобы он сохранялся

  if (list.getSize() === 0) { //инициализация списка
    list.insertAt('1', 0);
    list.insertAt('8', 0);
    list.insertAt('34', 0);
    list.insertAt('0', 0);
  }

  const [animation, setAnimation] = React.useState<Array<Array<string | null>>>(initLinkedList(list.print())); //массив элементов стэка для отображения [значение,цвет круга]

  const addHeadButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(LoaderStates.AddHead);
    //1ый кадр с кружком над первым элементом
    let newIter = animation;
    newIter[0][2] = inputValue;
    newIter[0][3] = 'changing';
    setTimeout(() => {
      setAnimation(newIter);
    }, 0);

    //2ой кадр с появившимся слева элементом, круг зеленого цвета
    setTimeout(() => {
      list.insertAt(inputValue, 0);
      setInputValue('');
      let newIter = initLinkedList(list.print());
      newIter[0][1] = 'modified';
      setAnimation(newIter);
    }, DELAY_IN_MS);

    //3ий кадр - результат добавления
    setTimeout(() => {
      let newIter = initLinkedList(list.print());
      setAnimation(newIter);
      setActive(false);
    }, DELAY_IN_MS * 2);
  }

  const addTailButton = () => {
    setActive(LoaderStates.AddTail);
    //1ый кадр с кружком над последним элементом
    let newIter = animation;
    newIter[list.getSize() - 1][2] = inputValue;
    newIter[list.getSize() - 1][3] = 'changing';
    setTimeout(() => {
      setAnimation(newIter);
    }, 0);

    //2ой кадр с появившимся справа элементом, круг зеленого цвета
    setTimeout(() => {
      list.insertAt(inputValue, list.getSize());
      setInputValue('');
      let newIter = initLinkedList(list.print());
      newIter[list.getSize() - 1][1] = 'modified';
      setAnimation(newIter);
    }, DELAY_IN_MS);

    //3ий кадр - результат добавления
    setTimeout(() => {
      setAnimation(initLinkedList(list.print()));
      setActive(false);
    }, DELAY_IN_MS * 2);
  }

  const removeHeadButton = () => {
    setActive(LoaderStates.RemoveHead);
    //1ый кадр с кружком над первым элементом
    let newIter = animation;
    newIter[0][4] = newIter[0][0];
    newIter[0][0] = '';
    newIter[0][5] = 'changing'
    setTimeout(() => {
      setAnimation(newIter);
    }, 0);

    //2ой кадр - результат удаления
    setTimeout(() => {
      list.removeAt(0);
      setInputValue('');
      setAnimation(initLinkedList(list.print()));
      setActive(false);
    }, DELAY_IN_MS);
  }

  const removeTailButton = () => {
    setActive(LoaderStates.RemoveTail);
    //1ый кадр с кружком над первым элементом
    let newIter = animation;
    newIter[list.getSize() - 1][4] = newIter[list.getSize() - 1][0];
    newIter[list.getSize() - 1][0] = '';
    newIter[list.getSize() - 1][5] = 'changing'
    setTimeout(() => {
      setAnimation(newIter);
    }, 0);

    //2ой кадр - результат удаления
    setTimeout(() => {
      list.removeAt(list.getSize() - 1);
      setInputValue('');
      setAnimation(initLinkedList(list.print()));
      setActive(false);
    }, DELAY_IN_MS);
  }

  const addIndexButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(LoaderStates.AddIndex);

    const index = parseInt(inputIndexValue, 10);
    setInputIndexValue('');

    if (inputIndexValue) {
      //Цикл генерирующий кадры с пошаговым подсвечиванием элементов
      let newIter = animation;
      for (let i = 0; i <= index; i++) {
        if (i > 0) {
          newIter[i - 1][2] = null;
          newIter[i - 1][3] = null;
          newIter[i - 1][1] = 'changing';
        }
        newIter[i][2] = inputValue;
        newIter[i][3] = 'changing';

        let newIteration = JSON.parse(JSON.stringify(newIter));
        setTimeout(() => {
          setAnimation(newIteration);
        }, i * DELAY_IN_MS);
      }

      //2ой кадр с вставленным элементом, круг зеленого цвета
      setTimeout(() => {
        list.insertAt(inputValue, index);
        setInputValue('');
        let newIter = initLinkedList(list.print());
        newIter[index][1] = 'modified';
        setAnimation(newIter);
      }, DELAY_IN_MS * (index + 1));

      //3ий кадр - результат добавления
      setTimeout(() => {
        let newIter = initLinkedList(list.print());
        setAnimation(newIter);
        setActive(false);
      }, DELAY_IN_MS * (index + 2));
    }
  }

  const removeIndexButton = () => {
    setActive(LoaderStates.RemoveIndex);

    const index = parseInt(inputIndexValue, 10);
    setInputIndexValue('');

    if (inputIndexValue) {
      //Цикл генерирующий кадры с пошаговым подсвечиванием элементов
      let newIter = animation;
      for (let i = 0; i <= index+1; i++) {
        if (i > 0) {
          newIter[i - 1][1] = 'changing';
        }

        let newIteration = JSON.parse(JSON.stringify(newIter));
        setTimeout(() => {
          setAnimation(newIteration);
        }, i * DELAY_IN_MS);
      }

      //2ой кадр с кругом снизу,в котором удаляемый элемент
      setTimeout(() => {
        let newIter = animation;
        for (let i = 0; i <= index; i++) {
          newIter[i][1]='changing';        
        }
        newIter[index][4] = newIter[index][0];
        newIter[index][5] = 'changing';
        newIter[index][0] = null;
        let newIteration = JSON.parse(JSON.stringify(newIter));
        setAnimation(newIteration);
      }, DELAY_IN_MS * (index + 2));

      //3ий кадр - результат удаления
      setTimeout(() => {
        list.removeAt(index);
        setAnimation(initLinkedList(list.print()));
        setActive(false);
      }, DELAY_IN_MS * (index + 3));
    }
  }

  const content = React.useMemo(
    () => {
      return (
        <div className={styles['list__content']}>
          <div className={styles['list__forms']}>
            <form className={styles['list__form']}>
              <div className={styles['list__div']}>
                <Input
                  extraClass={styles['list__input']}
                  name={'text'}
                  value={inputValue}
                  placeholder="Введите текст"
                  maxLength={4}
                  onChange={event => setInputValue(event.target.value)}
                >
                </Input>
              </div>
              <Button
                extraClass={styles['list__button']}
                type="submit"
                text='Добавить в head'
                onClick={addHeadButton}
                disabled={(active || (list.getSize()>LIST_SIZE) || !inputValue) ? true : false}
                isLoader={active === LoaderStates.AddHead ? true : false}
              >
              </Button>
              <Button
                extraClass={styles['list__button']}
                type="button"
                text='Добавить в tail'
                onClick={addTailButton}
                disabled={(active || (list.getSize()>LIST_SIZE) || !inputValue) ? true : false}
                isLoader={active === LoaderStates.AddTail ? true : false}
              >
              </Button>
              <Button
                extraClass={styles['list__button']}
                type="button"
                text='Удалить из head'
                onClick={removeHeadButton}
                disabled={(active || !(list.getSize()>1))? true : false}
                isLoader={active === LoaderStates.RemoveHead ? true : false}
              >
              </Button>
              <Button
                extraClass={styles['list__button']}
                type="button"
                text='Удалить из tail'
                onClick={removeTailButton}
                disabled={(active || !(list.getSize()>1))? true : false}
                isLoader={active === LoaderStates.RemoveTail ? true : false}
              >
              </Button>
            </form>
            <form className={styles['list__form']}>
              <div className={styles['list__div']}>
                <Input
                  type='number'
                  extraClass={styles['list__input']}
                  value={inputIndexValue}
                  isLimitText={false}
                  placeholder="Введите индекс"
                  onChange={event => setInputIndexValue(event.target.value)}
                >
                </Input>
              </div>
              <Button
                extraClass={styles['list__button']}
                type="submit"
                text='Добавить по индексу'
                onClick={addIndexButton}
                disabled={(
                  active || 
                  (list.getSize()>LIST_SIZE) || 
                  !inputIndexValue || 
                  !inputValue ||
                  parseInt(inputIndexValue)>list.getSize()-1 ||
                  parseInt(inputIndexValue)<0) ? true : false}
                isLoader={active === LoaderStates.AddIndex ? true : false}
              >
              </Button>
              <Button
                extraClass={styles['list__button']}
                type="button"
                text='Удалить по индексу'
                onClick={removeIndexButton}
                disabled={(
                  active || 
                  (list.getSize()>LIST_SIZE) || 
                  !inputIndexValue ||
                  parseInt(inputIndexValue)>list.getSize()-1 ||
                  parseInt(inputIndexValue)<0) ? true : false}
                isLoader={active === LoaderStates.RemoveIndex ? true : false}
              >
              </Button>
            </form>
          </div>
          {animation &&
            <div className={styles['list__result']}>
              {animation.map((iter, index) => {
                return <div className={styles['list__flex']} key={Math.random()}>
                  <Circle
                    state={elementColor(iter[1])}
                    letter={iter[0] ? iter[0] : ''}
                    head={circleSmall(index, animation.length, 'head', iter[2], iter[3])}
                    tail={circleSmall(index, animation.length, 'tail', iter[4], iter[5])}
                    index={index}>
                  </Circle>
                  <div className={index !== animation.length - 1 ? '' :
                    styles['list__arrow_visibility_none']}>
                    <ArrowIcon
                      fill={iter[1] === 'changing' ? arrowColor('changing') : arrowColor()}>
                    </ArrowIcon>
                  </div>
                </div>
              })}
            </div>
          }

        </div>
      )
    }, [inputValue, inputIndexValue, animation, active]
  );

  return (
    <SolutionLayout title="Связный список">
      {content}
    </SolutionLayout>
  );
};