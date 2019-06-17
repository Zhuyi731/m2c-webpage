const HtmlPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        "index": path.join(__dirname, "../src/index.js")
    },
    output: {
        filename: "[name]_[chunkhash:5].js",
        path: path.join(__dirname, "../public"),
        chunkFilename: "[name]_[chunkhash:5].js"
    },
    resolve: {
        extensions: [".js", ".json"],
        alias: {
            "@components": path.join(__dirname, "../src/components"),
            "@pages": path.join(__dirname, "../src/pages"),
            "@assets": path.join(__dirname, "../src/assets")
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }]
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ],
                    plugins: [
                        "@babel/plugin-transform-runtime",
                        "@babel/plugin-proposal-function-bind",
                        ["import", {
                            "libraryName": "antd",
                            "libraryDirectory": "lib",
                            "style": "css" 
                        }]
                    ]
                }
            }]
        }]
    },
    plugins: [
        new HtmlPlugin({
            template: path.join(__dirname, "../src/index.html"),
            filename: "index.html",
            chunks: ["index"],
            inject: "body"
        })
    ]
};