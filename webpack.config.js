module.exports = {
  entry: './main.js',
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.js$/, loader: 'jsx-loader?harmony' },
      {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
}
