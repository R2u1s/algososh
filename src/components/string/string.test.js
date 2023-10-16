import React from 'react';
import { reverse } from '../../utils/utils';
import { CIRCLE_COLOR_MODIFIED } from '../../constants/color';

describe("Алгоритм разворота строки", () => {
  test("Корректный разворот строки с четным числом символов", () => {
    const str = 'abcd';
    const correctAnswer = [
      ['d',CIRCLE_COLOR_MODIFIED],
      ['c',CIRCLE_COLOR_MODIFIED],
      ['b',CIRCLE_COLOR_MODIFIED],
      ['a',CIRCLE_COLOR_MODIFIED]
    ];
    const res = reverse(str);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректный разворот строки с нечетным числом символов", () => {
    const str = 'abcde';
    const correctAnswer = [
      ['e',CIRCLE_COLOR_MODIFIED],
      ['d',CIRCLE_COLOR_MODIFIED],
      ['c',CIRCLE_COLOR_MODIFIED],
      ['b',CIRCLE_COLOR_MODIFIED],
      ['a',CIRCLE_COLOR_MODIFIED]
    ];
    const res = reverse(str);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректный разворот строки с одним символом", () => {
    const str = 'a';
    const correctAnswer = [
      ['a',CIRCLE_COLOR_MODIFIED]
    ];
    const res = reverse(str);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректный разворот пустой строки", () => {
    const str = '';
    const res = reverse(str);
    expect(res).toStrictEqual([]);
  });
});