'use client';

import * as React from 'react';

import { fetchColors } from '@/api';

interface ColorContext {
  colorMap: any;
}

const DEFAULT_CONTEXT_VALUE = {
  colorMap: undefined,
};

export const ColorContext = React.createContext<ColorContext>(DEFAULT_CONTEXT_VALUE);

export const useColorContext = () => React.useContext(ColorContext);

export const ColorProvider = async ({
  apiUrl,
  children,
}: {
  apiUrl: string;
  children: React.ReactNode;
}) => {
  const colors = await fetchColors(apiUrl);
  const colorMap = colors.colours.reduce((acc: any, color: any) => {
    acc[color.code] = color.name;
    return acc;
  }, {});

  return <ColorContext.Provider value={{ colorMap }}>{children}</ColorContext.Provider>;
};
