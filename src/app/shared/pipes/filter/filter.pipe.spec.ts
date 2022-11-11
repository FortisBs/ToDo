import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;
  let array: {name: string}[];

  beforeEach(() => {
    pipe = new FilterPipe();
    array = [{ name: 'first' }, { name: 'second' }];
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return initial array if filterValue is empty string', () => {
    const returnedArray = pipe.transform(array, '');
    expect(returnedArray).toEqual(array);
  });

  it('should return filtered array if filterValue matches value in array', () => {
    const returnedArray = pipe.transform(array, 'first');
    expect(returnedArray.length).toBe(1);
    expect(returnedArray[0].name).toBe('first');
  });
});
