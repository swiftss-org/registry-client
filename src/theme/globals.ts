type Theme = {
  fontFamily: string;
  defaultTextColor: string;
  defaultBackgroundColor: string;
  defaultFontSize: string;
  colors: {
    branded1: string;
    white: string;
    black: string;
    lightGray: string;
    darkGray: string;
    errorRed: string;
  };
};

const colors = {
  white: '#ffffff',
  black: '#000000',
  lightGray: '#c4c4c4',
  darkGray: '#9b9b9b',
  errorRed: '#FBC8C8',
};

const defaultTheme: Theme = {
  fontFamily: 'Roboto, sans-serif',
  defaultTextColor: `${colors.black}`,
  defaultBackgroundColor: colors.white,
  defaultFontSize: '12px',
  colors: {
    branded1: '#eef5fb',
    white: colors.white,
    black: colors.black,
    lightGray: colors.lightGray,
    darkGray: colors.darkGray,
    errorRed: colors.errorRed,
  },
};

export default defaultTheme;

export const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  almostLaptopL: '1439px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};
