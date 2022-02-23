import '@emotion/react';
import { Theme as OrfiumIctinus } from '@orfium/ictinus';

import { Theme as SystemTheme } from './globals'; // DEFINE HERE YOUR THEME

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends SystemTheme, OrfiumIctinus {}
}
