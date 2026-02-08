'use client';

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';

import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

const system = createSystem(defaultConfig, {
  cssVarsPrefix: 'chakra',
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'Source Code Pro Variable' },
        body: { value: 'Source Code Pro Variable' },
      },
      colors: {
        gray: {
          900: { value: '#1f2328' },
        },
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
