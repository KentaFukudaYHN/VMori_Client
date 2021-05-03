const path = require('path');
const { VueLoaderPlugin, default: loader } = require('vue-loader')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
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
                use: ['style-loader', 'css-loader', 'sass-loader']
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
        new VueLoaderPlugin()
    ],
    devServer:{
        contentBase: __dirname + '/dist',
        publicPath: '/',
        noInfo: true,
        port: 3000
    }
}