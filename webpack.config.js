const path = require('path');

const NODE_ENV =
  process.env.NODE_ENV ?
    process.env.NODE_ENV.trim() :
    'production';

module.exports = {
  entry: {
    index: './src/index.js'
  },
  externals: [
    '@types/react', {
    'react': {
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
      root: 'React',
      umd: 'react'
    }
  }],
  mode: NODE_ENV,
  module: {
    rules: [

      // JavaScript
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    filename: '[name].js',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    library: 'reactn',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '.'),
    umdNamedDefine: true
  },
  resolve: {
    alias: {
      '@types/react': path.resolve(__dirname, './node_modules/@types/react'),
      'react': path.resolve(__dirname, './node_modules/react')
    }
  },
  watch: NODE_ENV === 'development'
};
