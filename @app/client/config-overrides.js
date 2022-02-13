const { override, addWebpackPlugin } = require("customize-cra");

const webpack = require("webpack");

const { ROOT_URL, T_AND_C_URL } = process.env;
if (!ROOT_URL) {
  throw new Error("ROOT_URL is a required envvar");
}

module.exports = override(
  addWebpackPlugin(
    new webpack.DefinePlugin({
      "process.env.ROOT_URL": JSON.stringify(ROOT_URL),
      "process.env.T_AND_C_URL": JSON.stringify(T_AND_C_URL || null),
    })
  )
);
