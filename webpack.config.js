const path = require('path');
const { VueLoaderPlugin, default: loader } = require('vue-loader')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack')
const { config } = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin');

config()

module.exports = {
    mode: 'production',
    devtool: 'inline-source-map',
    entry: './src/main.ts',
    output: {
        path : path.resolve(__dirname, 'dist'),
        filename: "bundle.[contenthash].js"
    },
    resolve:{
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        //tsconfigのpathsが効くようにする
        plugins: [new TsconfigPathsPlugin({
            configFile: 'tsconfig.json'
        })]
    },
    module: {
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use:[
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader', 
                    'sass-loader', 
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources:[
                                path.resolve(__dirname, './dist/css/vue-global.scss')
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    //vueをtypescriptとして扱う
                    appendTsSuffixTo: [/\.vue/]
                }
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "./src/index.html")
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'API_URL': JSON.stringify(process.env.API_URL),
                'Support_Mail': JSON.stringify(process.env.Mail__SupportMailAddress)
            }
        })
    ],
    devServer:{
        contentBase: __dirname + '/dist',
        publicPath: '/',
        noInfo: true,
        port: 3000,
        historyApiFallback: true
    }
}