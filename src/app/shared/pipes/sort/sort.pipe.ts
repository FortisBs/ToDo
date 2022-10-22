import { Pipe, PipeTransform } from '@angular/core';
import { SortValue } from "../../models/toolbar.model";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform<T>(
    initialArray: T[],
    sortValue: SortValue,
    isAscDirection: boolean
  ): T[] {
    if (!initialArray.length) return [];

    const compare = (a: any, b: any) => {
      if (isAscDirection) {
        if (a[sortValue] > b[sortValue]) return 1;
        if (a[sortValue] < b[sortValue]) return -1;
        return 0;
      }

      if (a[sortValue] > b[sortValue]) return -1;
      if (a[sortValue] < b[sortValue]) return 1;
      return 0;
    }

    return [...initialArray.sort(compare)];
  }
}
