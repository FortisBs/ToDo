import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform<T>(initialArray: T, filterValue: string): T {
    if (!initialArray) {
      // @ts-ignore
      return null;
    }

    if (filterValue) {
      // @ts-ignore
      return initialArray.filter((item) => {
        return item.name.toLowerCase().includes(filterValue.toLowerCase());
      });
    }

    return initialArray;
  }
}
