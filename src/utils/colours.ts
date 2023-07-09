import { ColourLibrary } from '@/types';

const buildColourMap = (colourLib: ColourLibrary) => {
  return colourLib.colours.reduce((acc: any, colour: any) => {
    acc[colour.code] = colour.name;
    return acc;
  }, {});
};

export { buildColourMap };
