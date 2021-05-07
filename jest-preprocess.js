const babelOptions = {
  presets: ['@emotion/babel-preset-css-prop', '@babel/preset-typescript'],
  plugins: ['emotion'],
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require('babel-jest').createTransformer(babelOptions);
