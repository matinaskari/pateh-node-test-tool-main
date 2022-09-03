const path = require("path");

module.exports = {
  devtool: "eval-source-map",
  mode: "production",
  entry: "./src/public/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src/public")],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  optimization: {
    minimize: false,
  },
};
