const path = require('path');
const { VueLoaderPlugin, default: loader } = require('vue-loader')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack')
const { config } = require('dotenv')

config()

module.exports = {
    entry: './src/main.ts',
    output: {
        path : path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
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
        new webpack.DefinePlugin({
            'process.env':{
                'API_URL': JSON.stringify(process.env.API_URL)
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