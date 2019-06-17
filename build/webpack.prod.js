const merge = require("webpack-merge");
const base = require("./webpack.base.js");

module.exports = merge(base, {
    devtool: "#cheap-source-map",
});