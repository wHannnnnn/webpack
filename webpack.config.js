const path = require("path"); //需要使用绝对路径
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
    mode: "development",
    entry: {
        home: "./src/js/home/index.js",
        login: "./src/js/login/index.js"
    },
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "js/[name].js",
        publicPath: ""
    },
    devServer: {
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    // loader: 'file-loader',
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 8192,
                        esModule: false
                    },
                }
            },
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            },
            {
                // 打包字体文件
                test: /\.(eot|ttf|svg|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'font/',
                    }
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                include: path.join(__dirname, 'src'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader", 
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ],
                        },
                    },
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "home.html",
            template: "./src/home.html",
            minify: {
                removeComment: true,
                collapseWhitespace: true
            },
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            filename: "login.html",
            template: "./src/login.html",
            chunks: ['login']
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.Jquery': "jquery"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            chunkFilename: 'css/[id][chunkhash:8].css',
        }),
        //可以将css代码分离出来,如果不适用,分离成单独的文件，默认是自动注入到内部的
        // new ExtractTextPlugin("css/[name].css")
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            cacheGroups: {
                venders: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'all',
                },
                // default: { // 没有 test 表明所有的模块都能进入 default 组，但是注意它的优先级较低。
                //     priority: -20, //  根据优先级决定打包到哪个组里,打包到优先级高的组里。
                //     reuseExistingChunk: true // //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
                // }
            }
        },
        minimizer: [
            new TerserPlugin({
                cache: true, // 开启缓存
                parallel: true, // 支持多进程
                sourceMap: true,
                terserOptions: {
                    compress: {
                        unused: true,
                        drop_debugger: true,
                        // drop_console: true,
                        dead_code: true
                    }
                }
            }),
        ]
    },
}