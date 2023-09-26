import { Direction } from "./direction";

export interface TSort {
  active: boolean,
  type: string,
  direction: Direction,
  array: number[]
}