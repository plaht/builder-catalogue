'use client';

import * as React from 'react';

import { ColourLibrary } from '@/types';

interface ColorLibraryContext {
  colourMap: any;
}

const DEFAULT_CONTEXT_VALUE = {
  colourMap: undefined,
};

export const ColourLibraryContext = React.createContext<ColorLibraryContext>(DEFAULT_CONTEXT_VALUE);

export const useColorContext = () => React.useContext(ColourLibraryContext);

export const ColourLibraryProvider = async ({
  colours,
  children,
}: {
  colours: ColourLibrary;
  children: React.ReactNode;
}) => {

  const colourMap = colours.colours.reduce((acc: any, colour: any) => {
    acc[colour.code] = colour.name;
    return acc;
  }, {});

  return <ColourLibraryContext.Provider value={{ colourMap }}>{children}</ColourLibraryContext.Provider>;
};
