module.exports = {
  entry: './scripts/index',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/scripts/'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.js$/, loader: 'jsx-loader?harmony' },
      {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
}
