import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from './sort.module.css'
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { bubbleSort, elementColor, firstSortIteration, randomArr, selectionSort } from "../../utils/utils";
import { TSort } from "../../types/types";
import { Column } from "../ui/column/column";

const SORT_TYPE_SELECTION = 'selection';
const SORT_TYPE_BUBBLE = 'bubble';

export const SortingPage: React.FC = () => {

  const [sort, setSort] = React.useState<TSort>({
    active: false,
    type: SORT_TYPE_BUBBLE,
    direction: Direction.Ascending,
    array: []
  });

  const [animation, setAnimation] = React.useState<Array<Array<number | string>>>([]);

  const newArray = () => {
    const newArr = randomArr();
    setSort({
      ...sort,
      array: newArr
    });
    setAnimation(firstSortIteration(newArr)[0]);
  }

  if (animation.length === 0) {newArray()}

  const onChangeRadio = (e: React.BaseSyntheticEvent) => {
    setSort({
      ...sort,
      type: e.target.value
    });
    setAnimation(firstSortIteration(sort.array)[0]);
  };

  React.useEffect(
    () => {
      if (sort.array.length > 0 && sort.active) {
        const iterations: Array<Array<Array<number | string>>> = sort.type === SORT_TYPE_BUBBLE ?
          bubbleSort(sort.array, sort.direction === Direction.Ascending) :
          selectionSort(sort.array, sort.direction === Direction.Ascending)

        iterations.forEach((iter, i) => {
          setTimeout(() => {
            setAnimation(iter);
            if (i === iterations.length - 1) {
              setSort({
                ...sort,
                active: false
              });
            }
          }, i * 500);
        });
      }
    },
    [sort.active]
  );

  const content = React.useMemo(
    () => {
      return (
        <div className={styles['sort__content']}>
          <div className={styles['sort__settings']}>
            <div className={styles['sort__radios']}>
              <RadioInput
                label='Выбор'
                value={SORT_TYPE_SELECTION}
                checked={sort.type === SORT_TYPE_SELECTION ? true : false}
                onChange={onChangeRadio}
              />
              <RadioInput
                label='Пузырёк'
                value={SORT_TYPE_BUBBLE}
                checked={sort.type === SORT_TYPE_BUBBLE ? true : false}
                onChange={onChangeRadio}
              />
            </div>
            <div className={styles['sort__directions']}>
              <Button
                type="button"
                text='По возрастанию'
                sorting={Direction.Ascending}
                linkedList='medium'
                value={Direction.Ascending}
                onClick={() => {
                  setSort({
                    ...sort,
                    active: true,
                    direction: Direction.Ascending
                  });
                  setAnimation(firstSortIteration(sort.array)[0]);
                }}
                isLoader={sort.active && sort.direction === Direction.Ascending ? true : false}
                disabled={sort.active || !(sort.array.length > 0) ? true : false}
              >
              </Button>
              <Button
                type="button"
                text='По убыванию'
                sorting={Direction.Descending}
                linkedList='medium'
                value={Direction.Descending}
                onClick={() => {
                  setSort({
                    ...sort,
                    active: true,
                    direction: Direction.Descending
                  });
                  setAnimation(firstSortIteration(sort.array)[0]);
                }}
                isLoader={sort.active && sort.direction === Direction.Descending ? true : false}
                disabled={sort.active || !(sort.array.length > 0) ? true : false}
              >
              </Button>
            </div>
            <Button
              type="button"
              text='Новый массив'
              linkedList='medium'
              onClick={newArray}
              disabled={sort.active ? true : false}
            >
            </Button>
          </div>

          {sort.array.length > 0 &&
            <div className={styles['sort__result']}>
              {animation && animation.map(iter => {
                {
                  return <Column state={elementColor(iter[1].toString())} index={typeof iter[0] === 'string' ? parseInt(iter[0]) : iter[0]} key={Math.random()}></Column>
                }
              })}
            </div>
          }
        </div>
      )
    }, [animation, sort]
  );

  return (
    <SolutionLayout title="Сортировка массива">
      {content}
    </SolutionLayout>
  );
};
