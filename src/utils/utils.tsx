import React from "react";
import { EnumMember } from "typescript"
import { ElementStates } from "../types/element-states"
import { QUEUE_SIZE } from "../components/queue-page/queue-page"
import { Circle } from "../components/ui/circle/circle"
import { CIRCLE_COLOR_DEFAULT,CIRCLE_COLOR_CHANGING,CIRCLE_COLOR_MODIFIED } from "../constants/color";


export const elementColor = (index: string | null): ElementStates => {
  switch (index) {
    case CIRCLE_COLOR_DEFAULT: {
      return ElementStates.Default
    }
    case CIRCLE_COLOR_CHANGING: {
      return ElementStates.Changing
    }
    case CIRCLE_COLOR_MODIFIED: {
      return ElementStates.Modified
    }
    default:
      return ElementStates.Default
  }
}

export const arrowColor = (color?: string): string => {
  switch (color) {
    case CIRCLE_COLOR_CHANGING: {
      return '#D252E1'
    }
    default:
      return '#0032FF';
  }
}

export function circleSmall(index: number, maxIndex:number, text:string, value: string | null, color: string | null): string | React.ReactElement | null {
  if (value) {
    return <Circle
      state={elementColor(color)}
      letter={value}
      isSmall={true}>
    </Circle>
  } else { 
    return index===0 && text==='head' ? 'head' : index===maxIndex-1 && text==='tail' ? 'tail' : ''
  }
}

export const reverse = (str: string): Array<Array<string[]>> => {
  if (!str) return [];
  let res = str.split('');
  let animation = [];
  let start = 0;
  let end = res.length - 1;
  animation = res.map((letter) => { return [letter, 0] });
  let animationArr = [];
  animationArr.push(animation);

  while (start < end + 1) {
    //добавляем итерацию анимации с выбранными буквами
    let newAnimation = JSON.parse(JSON.stringify(animationArr[animationArr.length - 1]));
    newAnimation[start][1] = CIRCLE_COLOR_CHANGING;
    newAnimation[end][1] = CIRCLE_COLOR_CHANGING;
    animationArr.push(newAnimation);

    //меняем местами первую и последнюю букву
    const temp = res[end];
    res[end] = res[start];
    res[start] = temp;

    //добавляем итерацию анимации с перемещенными буквами
    newAnimation = JSON.parse(JSON.stringify(animationArr[animationArr.length - 1]));
    newAnimation[start] = [res[start], CIRCLE_COLOR_MODIFIED];
    newAnimation[end] = [res[end], CIRCLE_COLOR_MODIFIED];
    animationArr.push(newAnimation);

    //увеличиваем указатель на первую букву и уменьшаем указатель на последнюю
    start++;
    end--;
  }
  
  return animationArr;
}

export const getFibonacciNumbers = (n: number): number[] => {
  let arr: number[] = [0, 1];
  for (let i = 2; i < n + 2; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  arr.shift();
  return arr;
}

export const arrayToIterations = (arr: Array<number>): Array<number[]> => {
  const { length } = arr;
  const res: Array<number[]> = [[arr[0]]];
  for (let i = 1; i < length; i++) {
    const temp = JSON.parse(JSON.stringify(res[res.length - 1]))
    temp.push(arr[i]);
    res.push(temp);
  }
  return res;
}

export const randomArr = (): number[] => {
  let arr = [];
  const minLen = 3;
  const maxLen = 10;
  const min = 0;
  const max = 100;
  let arrLength = Math.trunc(Math.random() * (maxLen - minLen) + minLen);
  for (let i = 0; i < arrLength; i++) {
    arr.push(Math.trunc(Math.random() * (max - min) + min));
  }
  return arr;
}

const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const firstSortIteration = (arr: number[]): Array<Array<Array<number | string>>> => {
  let animationArr = [];
  //первый кадр анимации - все цифры на исходном месте с исходным цветом
  animationArr.push(arr.map((num) => { return [num, CIRCLE_COLOR_DEFAULT] }));
  return animationArr;
}

export const bubbleSort = (arr: number[], dir: boolean): Array<Array<Array<number | string>>> => {
  if (!(arr.length > 0)) return [];
  const { length } = arr;
  //создаем массив подкадровой анимации
  let animationArr = [];
  //первый кадр анимации - все цифры на исходном месте с исходным цветом
  animationArr = firstSortIteration(arr);
  //цикл сортировки пузырьком
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      //новый кадр, в нём подсвечиваем два текущих числа
      let newAnimation = JSON.parse(JSON.stringify(animationArr[animationArr.length - 1]));
      if (j > 0) newAnimation[j - 1][1] = CIRCLE_COLOR_DEFAULT;
      newAnimation[j][1] = CIRCLE_COLOR_CHANGING;
      newAnimation[j + 1][1] = CIRCLE_COLOR_CHANGING;
      animationArr.push(newAnimation);
      if (dir ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1]) {
        swap(arr, j, j + 1);
        //новый кадр, в нём подсвечиваем два текущих числа, которые поменялись местами
        newAnimation = JSON.parse(JSON.stringify(animationArr[animationArr.length - 1]));
        newAnimation[j] = [arr[j], CIRCLE_COLOR_CHANGING];
        newAnimation[j + 1] = [arr[j + 1], CIRCLE_COLOR_CHANGING];
        animationArr.push(newAnimation);
      }
    }
    //новый кадр, в нём последнее число - на своем месте, а предыдущее снова в исходном цвете
    let newAnimation = JSON.parse(JSON.stringify(animationArr[animationArr.length - 1]));
    if (length - i - 2 > 0) newAnimation[length - i - 2] = [arr[length - i - 2], CIRCLE_COLOR_DEFAULT];
    newAnimation[length - i - 1] = [arr[length - i - 1], CIRCLE_COLOR_MODIFIED];
    animationArr.push(newAnimation);
  }

  return animationArr;
}

export const selectionSort = (arr: number[], dir: boolean): Array<Array<Array<number | string>>> => {
  if (!(arr.length > 0)) return [];
  const { length } = arr;
  //создаем массив подкадровой анимации
  let animationArr = [];
  let newAnimation = [];
  //первый кадр анимации - все цифры на исходном месте с исходным цветом
  animationArr = firstSortIteration(arr);
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = maxInd + 1; j < length; j++) {
      //новый кадр, в нём подсвечиваем два текущих числа
      newAnimation = JSON.parse(JSON.stringify(animationArr[animationArr.length - 1]));
      if (j > maxInd) newAnimation[j - 1][1] = CIRCLE_COLOR_DEFAULT;
      newAnimation[i][1] = CIRCLE_COLOR_CHANGING;
      newAnimation[j][1] = CIRCLE_COLOR_CHANGING;
      animationArr.push(newAnimation);
      if (dir ? arr[j] < arr[maxInd] : arr[j] > arr[maxInd]) maxInd = j;
    }
    swap(arr, i, maxInd);
    newAnimation = JSON.parse(JSON.stringify(animationArr[animationArr.length - 1]));
    newAnimation[i] = [arr[i], CIRCLE_COLOR_MODIFIED];
    newAnimation[maxInd] = [arr[maxInd], CIRCLE_COLOR_DEFAULT];
    newAnimation[length - 1][1] = CIRCLE_COLOR_DEFAULT;
    animationArr.push(newAnimation);
  }
  animationArr.push(arr.map((num) => { return [num, CIRCLE_COLOR_MODIFIED] }));
  return animationArr;
};

export const initQueue = (): Array<string[]> => {
  const arr = [];
  for (let i = 0; i < QUEUE_SIZE; i++) {
    arr.push(['', CIRCLE_COLOR_DEFAULT]);
  }
  return arr;
}

export const initLinkedList = (listArr: string[]): Array<Array<string | null>> => {
  const arr = [];
  for (let i = 0; i < listArr.length; i++) {
    arr.push([listArr[i], CIRCLE_COLOR_DEFAULT, '', '','','']);
  }
  return arr;
}