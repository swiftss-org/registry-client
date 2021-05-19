module.exports = {
  presets: [['@babel/preset-react', { runtime: 'automatic', importSource: '@emotion/react' }]],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      'emotion',
      {
        sourceMap: false,
        autoLabel: process.env.NODE_ENV !== 'production',
        labelFormat: '[filename]_[local]',
        cssPropOptimization: true,
      },
    ],
  ],
};
