import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from './fibonacci.module.css'
import { Input } from "../ui/input/input";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { getFibonacciNumbers, arrayToIterations } from "../../utils/utils";

const INPUT_TEXT = 'text';
const MAX_NUMBER = 19;

export const FibonacciPage: React.FC = () => {

  const [activeFib, setActiveFib] = React.useState(false);
  const [animation, setAnimation] = React.useState<number[]>([]);

  const { values, handleChange } = useForm({});

  const saveHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActiveFib(true);
  }

  React.useEffect(
    () => {
      if (values[INPUT_TEXT] && activeFib) {
        const iterations: Array<number[]> = arrayToIterations(getFibonacciNumbers(parseInt(values[INPUT_TEXT])));
        iterations.forEach((iter, i) => {
          setTimeout(() => {
            setAnimation(iter);
            if (i === iterations.length-1) {
            setActiveFib(false)}
          }, i * 500);
        });

      }
    },
    [activeFib]
  );

  const content = React.useMemo(
    () => {
      return (
        <div className={styles['fibonacci__content']}>
          <form className={styles['fibonacci__input']} onSubmit={saveHandler}>
            <Input
              name={INPUT_TEXT}
              type="number"
              placeholder="Введите текст"
              max={MAX_NUMBER}
              onChange={handleChange}
            >
            </Input>
            <Button
              type="submit"
              text='Раccчитать'
              isLoader={activeFib ? true : false}
              disabled={(activeFib || !values[INPUT_TEXT] || parseInt(values[INPUT_TEXT])>MAX_NUMBER || parseInt(values[INPUT_TEXT])<1) ? true : false}
            >
            </Button>
          </form>

          {animation &&
            <div className={styles['fibonacci__result']}>
              {animation.map((num, index) => {
                {
                  return <Circle letter={String(num)} key={index} index={index}></Circle>
                }
              })}
            </div>
          }
        </div>
      )
    }, [animation,activeFib,values]
  );

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      {content}
    </SolutionLayout>
  );
};
