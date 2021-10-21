import { rem } from 'polished';

export const appTheme = {
  fontFamily: "'Roboto', sans-serif",
  extraSpacing: {
    xLarge: rem(56),
    large: rem(48),
  },
  colors: {
    primary: 'white',
    secondary: '#0d629e',
  },
};

export const themeOverride = {
  palette: {
    primary: '#0d629e',
  },
  overrides: { tooltip: { background: { color: 'darkGray', shade: '500' } } },
};
