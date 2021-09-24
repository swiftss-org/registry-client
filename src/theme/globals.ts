import { rem } from 'polished';

export const appTheme = {
  fontFamily: "'Roboto', sans-serif",
  extraSpacing: {
    xLarge: rem(56),
    large: rem(48),
  },
  colors: {
    primary: 'white',
    secondary: '#eef5fb',
  },
};

export const themeOverride = {
  palette: {
    primary: '#eef5fb',
  },
  overrides: { tooltip: { background: { color: 'darkGray', shade: '500' } } },
};
