const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['@babel/polyfill', './src/index.jsx'],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: "./dist",
            name: '[name].[ext]'
          }
        },
        
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
        }
      },
      {
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
        }
      },
      {
        test: /\.m?tsx$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-typescript', '@babel/preset-env']
            }
        }
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  plugins: [
    new HTMLWebpackPlugin({template: "./src/index.html"}),
    new CleanWebpackPlugin() 
  ]
};