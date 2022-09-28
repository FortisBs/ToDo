import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from "../../models/board.model";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(initialArray: IBoard[] | null, sortValue: 'createdAt' | 'name', isAscDirection: boolean): IBoard[] | null {
    console.log(initialArray)
    if (!initialArray) return null;

    const compare = (a: IBoard, b: IBoard) => {
      if (isAscDirection) {
        if (a[sortValue] > b[sortValue]) return 1;
        if (a[sortValue] < b[sortValue]) return -1;
        return 0;
      }

      if (a[sortValue] > b[sortValue]) return -1;
      if (a[sortValue] < b[sortValue]) return 1;
      return 0;
    }

    return initialArray.sort(compare);
  }
}