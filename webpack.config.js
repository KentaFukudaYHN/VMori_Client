const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: './src/main.ts',
    output: {
        path : path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    resolve:{
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
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