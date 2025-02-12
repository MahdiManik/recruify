module.exports = {
    // other webpack config
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: /node_modules/,
        },
      ],
    },
  };
  