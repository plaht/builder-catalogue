export const getBrickUrl = (brickId: string, color: string): string => {
  return `https://img.bricklink.com/ItemImage/PN/${color}/${brickId}.png`;
};
