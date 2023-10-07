import React from 'react';
import { reverse } from '../../utils/utils';

describe("Алгоритм разворота строки", () => {
  test("Корректный разворот строки с четным числом символов", () => {
    const str = 'abcd';
    const correctAnswer = [
      ['d','modified'],
      ['c','modified'],
      ['b','modified'],
      ['a','modified']
    ];
    const res = reverse(str);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректный разворот строки с нечетным числом символов", () => {
    const str = 'abcde';
    const correctAnswer = [
      ['e','modified'],
      ['d','modified'],
      ['c','modified'],
      ['b','modified'],
      ['a','modified']
    ];
    const res = reverse(str);
    expect(res[res.length-1]).toStrictEqual(correctAnswer);
  });

  test("Корректный разворот строки с одним символом", () => {
    const str = 'a';
    const correctAnswer = [
      ['a','modified']
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