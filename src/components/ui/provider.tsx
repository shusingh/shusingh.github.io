'use client';

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';

import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'Source Code Pro Variable' },
        body: { value: 'Source Code Pro Variable' },
      },
    },
  },
});

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
