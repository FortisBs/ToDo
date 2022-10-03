import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform<T>(initialArray: T[], filterValue: string): T[] {
    if (!initialArray.length) return [];

    if (filterValue) {
      return initialArray.filter((item: any) => {
        return item['name'].toLowerCase().includes(filterValue.trim().toLowerCase());
      });
    }

    return initialArray;
  }
}
