import { combinations } from './combinations';

const testList = [
  'brick',
  'plate',
  'tile',
  'spoon',
  'chicken',
  'sausage',
  'bacon',
  'egg',
  'apple',
  'banana',
];

describe('combinations utils test', () => {
  it('should return all combinations', () => {
    const cp = combinations(testList);
    expect(cp).toHaveLength(1024);
  });

  it('should return all combinations filtered on size', () => {
    let cp = combinations(testList, 1);
    expect(cp).toHaveLength(10);
    cp = combinations(testList, 2);
    expect(cp).toHaveLength(45);
    cp = combinations(testList, 3);
    expect(cp).toHaveLength(120);
    cp = combinations(testList, 4);
    expect(cp).toHaveLength(210);
    cp = combinations(testList, 5);
    expect(cp).toHaveLength(252);
    cp = combinations(testList, 6);
    expect(cp).toHaveLength(210);
  });
});
