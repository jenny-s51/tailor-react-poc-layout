module.exports = {
  entry: "./src",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.[name]$/,
        use: {
          loader: "to-string-loader",
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
    }
    ],
  },
  node: {
    fs: 'empty'
  }
};
