const combinations = (array: string[], size?: number) => {
  const allCombinations = new Array(Math.pow(2, array.length)).fill(0).map((_, i) => {
    return array.filter((_, j) => {
      /* filter out the array items whose index bit
           is not a part of the bit value of allCombinations index
           e.g.
           i = 28 (11100) = 16 + 8 + 4
           j = { 0: 1, 1: 2, 2: 4, 3: 8, 4: 16 } 
           so indexes [2, 3, 4] are part of this combination
        */
      return i & Math.pow(2, j);
    });
  });
  if (size) {
    return allCombinations.filter((item) => item.length === size);
  }
  return allCombinations;
};
export { combinations };
