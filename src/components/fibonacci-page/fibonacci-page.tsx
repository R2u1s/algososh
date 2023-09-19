import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from './fibonacci.module.css'
import { Input } from "../ui/input/input";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { getFibonacciNumbers, arrayToIterations } from "../../utils/utils";

const INPUT_TEXT = 'text';

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
              max={19}
              onChange={e => handleChange(e)}
            >
            </Input>
            <Button
              type="submit"
              text='Раccчитать'
              isLoader={activeFib ? true : false}
              disabled={activeFib ? true : false}
            >
            </Button>
          </form>

          {animation &&
            <div className={styles['fibonacci__result']}>
              {animation.map((num, index) => {
                {
                  return <Circle letter={String(num)} key={Math.random()} index={index}></Circle>
                }
              })}
            </div>
          }
        </div>
      )
    }, [animation,activeFib]
  );

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      {content}
    </SolutionLayout>
  );
};
