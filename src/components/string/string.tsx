import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from './string.module.css'
import { Input } from "../ui/input/input";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { elementColor, reverse } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

const INPUT_TEXT = 'text';

export const StringComponent: React.FC = () => {

  const [active, setActive] = React.useState(false);
  const [animation, setAnimation] = React.useState<Array<string[]>>();

  const { values, handleChange } = useForm({});

  const saveHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(true);
  }

  React.useEffect(
    () => {
      if (values[INPUT_TEXT] && active) {
      const iterations = reverse(values[INPUT_TEXT]);
      iterations.forEach((iter, i) => {
        setTimeout(() => {
          setAnimation(iter);
          if (i === iterations.length-1) {
            setActive(false)}
        }, i * DELAY_IN_MS);
      });
    }
    },
    [active]
  );

  const content = React.useMemo(
    () => {
      return (
        <div className={styles['string__content']}>
          <form className={styles['string__input']} onSubmit={saveHandler}>
            <Input
              name={INPUT_TEXT}
              placeholder="Введите текст"
              maxLength={11}
              onChange={e => handleChange(e)}
            >
            </Input>
            <Button
              type="submit"
              text='Развернуть'
              isLoader={active ? true : false}
              disabled={(active || !values[INPUT_TEXT]) ? true : false}
            >
            </Button>
          </form>

          {animation &&
            <div className={styles['string__result']}>
              {animation.map((letter,index) => {
                {
                  return <Circle state={elementColor(letter[1])} letter={letter[0]} key={index}></Circle>
                }

              })}

            </div>
          }

        </div>
      )
    }, [animation,values,active]
  );

  return (
    <SolutionLayout title="Строка">
      {content}
    </SolutionLayout>
  );
};