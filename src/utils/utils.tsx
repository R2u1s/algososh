import React from "react";
import { EnumMember } from "typescript"
import { ElementStates } from "../types/element-states"
import { QUEUE_SIZE } from "../components/queue-page/queue-page"
import { Circle } from "../components/ui/circle/circle"

export const elementColor = (index: string | null): ElementStates => {
  switch (index) {
    case 'default': {
      return ElementStates.Default
    }
    case 'changing': {
      return ElementStates.Changing
    }
    case 'modified': {
      return ElementStates.Modified
    }
    default:
      return ElementStates.Default
  }
}

export const arrowColor = (color?: string): string => {
  switch (color) {
    case 'changing': {
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
    newAnimation[start][1] = 'changing';
    newAnimation[end][1] = 'changing';
    animationArr.push(newAnimation);

    //меняем местами первую и последнюю букву
    const temp = res[end];
    res[end] = res[start];
    res[start] = temp;

    //добавляем итерацию анимации с перемещенными буквами
    newAnimation = JSON.parse(JSON.stringify(animationArr[animationArr.length - 1]));
    newAnimation[start] = [res[start], 'modified'];
    newAnimation[end] = [res[end], 'modified'];
    animationArr.push(newAnimation);

    //увеличиваем указатель на первую букву и уменьшаем указатель на последнюю
    start++;
    end--;
  }
  //console.log(animationArr);
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
  animationArr.push(arr.map((num) => { return [num, 'default'] }));
  return animationArr;
}

export const bubbleSort = (arr: number[], dir: boolean): Array<Array<Array<number | string>>> => {
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
      if (j > 0) newAnimation[j - 1][1] = 'default';
      newAnimation[j][1] = 'changing';
      newAnimation[j + 1][1] = 'changing';
      animationArr.push(newAnimation);
      if (dir ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1]) {
        swap(arr, j, j + 1);
        //новый кадр, в нём подсвечиваем два текущих числа, которые поменялись местами
        newAnimation = JSON.parse(JSON.stringify(animationArr[animationArr.length - 1]));
        newAnimation[j] = [arr[j], 'changing'];
        newAnimation[j + 1] = [arr[j + 1], 'changing'];
        animationArr.push(newAnimation);
      }
    }
    //новый кадр, в нём последнее число - на своем месте, а предыдущее снова в исходном цвете
    let newAnimation = JSON.parse(JSON.stringify(animationArr[animationArr.length - 1]));
    newAnimation[length - i - 2] = [arr[length - i - 2], 'default'];
    newAnimation[length - i - 1] = [arr[length - i - 1], 'modified'];
    animationArr.push(newAnimation);
  }
  return animationArr;
}

export const selectionSort = (arr: number[], dir: boolean): Array<Array<Array<number | string>>> => {
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
      if (j > maxInd) newAnimation[j - 1][1] = 'default';
      newAnimation[i][1] = 'changing';
      newAnimation[j][1] = 'changing';
      animationArr.push(newAnimation);
      if (dir ? arr[j] < arr[maxInd] : arr[j] > arr[maxInd]) maxInd = j;
    }
    swap(arr, i, maxInd);
    newAnimation = JSON.parse(JSON.stringify(animationArr[animationArr.length - 1]));
    newAnimation[i] = [arr[i], 'modified'];
    newAnimation[maxInd] = [arr[maxInd], 'default'];
    newAnimation[length - 1][1] = 'default';
    animationArr.push(newAnimation);
  }
  animationArr.push(arr.map((num) => { return [num, 'modified'] }));
  return animationArr;
};

export const initQueue = (): Array<string[]> => {
  const arr = [];
  for (let i = 0; i < QUEUE_SIZE; i++) {
    arr.push(['', 'default']);
  }
  return arr;
}

export const initLinkedList = (listArr: string[]): Array<Array<string | null>> => {
  const arr = [];
  for (let i = 0; i < listArr.length; i++) {
    arr.push([listArr[i], 'default', null, null,null,null]);
  }
  return arr;
}