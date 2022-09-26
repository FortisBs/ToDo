import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from "../../models/board.model";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(initialArray: IBoard[] | null, filterValue: string): IBoard[] | null {
    if (!initialArray) return null;

    if (filterValue) {
      return initialArray.filter((board) => {
        return board.name.toLowerCase().includes(filterValue.toLowerCase());
      });
    }

    return initialArray;
  }
}
