const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    'users_list_page': './src/views/users_list_page.pug',
    'user_edit_page': './src/views/user_edit_page.pug',
    'friend_list_page': './src/views/friend_list_page.pug',
    'friend_news_page': './src/views/friend_news_page.pug',
    'user_page': './src/views/user_page.pug',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/views/users_list_page.pug',
      filename: 'html/users_list_page.html',
      chunks: ['users_list_page'],
    }),
    new HtmlWebpackPlugin({
      template: './src/views/user_edit_page.pug',
      filename: 'html/user_edit_page.html',
      chunks: ['user_edit_page'],
    }),
    new HtmlWebpackPlugin({
      template: './src/views/friend_list_page.pug',
      filename: 'html/friend_list_page.html',
      chunks: ['friend_list_page'],
    }),
    new HtmlWebpackPlugin({
      template: './src/views/friend_news_page.pug',
      filename: 'html/friend_news_page.html',
      chunks: ['friend_news_page'],
    }),
    new HtmlWebpackPlugin({
      template: './src/views/user_page.pug',
      filename: 'html/user_page.html',
      chunks: ['user_page'],
    }),
    new MiniCssExtractPlugin({
      filename: 'layout.css',
    }),
  ]
};
