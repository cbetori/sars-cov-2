const { ModuleFederationPlugin } = require('webpack').container
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const deps = require('./package.json').dependencies

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    publicPath: prod
      ? 'https://sars-cov-2-cb.herokuapp.com/'
      : 'http://localhost:3002/',
  },
  resolve: {
    extensions: ['.js', '.tsx', '.json', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(css|less|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 3003,
    proxy: {
      '/api': 'http://localhost:3002',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'covid',
      filename: 'remoteEntry.js',
      exposes: {
        './Covid': './src/State.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
    }),
  ],
}
