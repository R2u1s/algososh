import React from 'react';
import { bubbleSort,selectionSort } from '../../utils/utils';

describe("Алгоритмы сортировки массива", () => {
  test("Корректная сортировка массива пузырьком", () => {
    const arr = [3,1,2,5,4];
    const correctAnswer = [
      [1,'modified'],
      [2,'modified'],
      [3,'modified'],
      [4,'modified'],
      [5,'modified']
    ];
    const res = bubbleSort(arr,true);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректная сортировка массива выбором", () => {
    const arr = [3,1,2,5,4];
    const correctAnswer = [
      [1,'modified'],
      [2,'modified'],
      [3,'modified'],
      [4,'modified'],
      [5,'modified']
    ];
    const res = selectionSort(arr,true);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректная сортировка пузырьком массива с одним элементом", () => {
    const arr = [1];
    const correctAnswer = [
      [1,'modified']
    ];
    const res = bubbleSort(arr);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректная сортировка выбором массива с одним элементом", () => {
    const arr = [1];
    const correctAnswer = [
      [1,'modified']
    ];
    const res = selectionSort(arr);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректная сортировка пузырьком пустого массива", () => {
    const arr = [];
    const res = bubbleSort(arr);
    expect(res).toStrictEqual([]);
  });

  test("Корректная сортировка выбором пустого массива", () => {
    const arr = [];
    const res = selectionSort(arr);
    expect(res).toStrictEqual([]);
  });
});