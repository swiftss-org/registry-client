module.exports = {
  presets: [['@babel/preset-react', { runtime: 'automatic', importSource: '@emotion/react' }]],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      "@emotion/babel-plugin",
      {
        sourceMap: false,
        autoLabel: process.env.NODE_ENV !== 'production' ? 'always' : undefined,
        labelFormat: '[filename]_[local]',
        cssPropOptimization: true,
        "importMap": {
          "@mui/system": {
            "styled": {
              "canonicalImport": ["@emotion/styled", "default"],
              "styledBaseImport": ["@mui/system", "styled"]
            }
          },
          "@mui/material/styles": {
            "styled": {
              "canonicalImport": ["@emotion/styled", "default"],
              "styledBaseImport": ["@mui/material/styles", "styled"]
            }
          },
          "@mui/material": {
            "styled": {
              "canonicalImport": ["@emotion/styled", "default"],
              "styledBaseImport": ["@mui/material", "styled"]
            }
          }
        }
      }
    ]
  ],
};
