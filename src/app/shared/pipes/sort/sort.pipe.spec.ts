import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {
  let pipe: SortPipe;
  let array: {name: string, complexity: number}[];

  beforeEach(() => {
    pipe = new SortPipe();
    array = [
      { name: 'a', complexity: 5 },
      { name: 'c', complexity: 1 },
      { name: 'b', complexity: 3 }
    ];
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if initial array length equal 0', () => {
    const returnedArray = pipe.transform([], 'name', false);
    expect(returnedArray.length).toBe(0);
  });

  it('should sort array by name in ascending order', () => {
    const returnedArray = pipe.transform(array, 'name', true);
    expect(returnedArray).toEqual(array.sort((a, b) => a.name.localeCompare(b.name)));
  });

  it('should sort array by name in descending order', () => {
    const returnedArray = pipe.transform(array, 'name', false);
    expect(returnedArray).toEqual(array.sort((a, b) => b.name.localeCompare(a.name)));
  });

  it('should sort array by complexity in ascending order', () => {
    const returnedArray = pipe.transform(array, 'complexity', true);
    expect(returnedArray).toEqual(array.sort((a, b) => a.complexity - b.complexity));
  });

  it('should sort array by complexity in descending order', () => {
    const returnedArray = pipe.transform(array, 'complexity', false);
    expect(returnedArray).toEqual(array.sort((a, b) => b.complexity - a.complexity));
  });
});
