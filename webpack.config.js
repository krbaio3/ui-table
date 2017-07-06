const path = require('path');
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const basePath = __dirname;

if (process.argv.indexOf('-p') !== -1) {
    process.env.NODE_ENV = 'production';
}

let config = {
    output: {
        path: __dirname + '/dist'
    }
}

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractSCSS = new ExtractTextPlugin('uiTable.css');

module.exports = {
    context: path.join(basePath, './src'),
    entry: './scripts/index.js',
    // entry: './main.js',
    output: {
        path: config.output.path,
        filename: 'uiTable-tpls.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ['env']
                    }
                }]
            },
            {
                test: /\.html$/,
                exclude: /(node_modules|bower_components|index.html)/,
                loader: ["ngtemplate-loader", "html-loader"]
            },
            {
                test: /\.scss$/,
                use: extractSCSS.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }]
                })
            },
            {
                test: /\.(png|jpg|jpeg|tiff|gif)$/,
                use: 'file-loader?name=./assets/img/[name].[ext]'
            },
        ]
    },
    plugins: [
        extractSCSS,
        new webpack.ProvidePlugin({
            "window.jQuery": "jquery",
            "jQuery": "jquery",
            "$": "jquery"
        }),
        // new CopyWebpackPlugin([{
        //     from: './index.html',
        //     to: './index.html',
        // }]),
        new HtmlWebpackPlugin({
            title: 'Cancelacion de carteras',
            filename: 'index.html', // nombre del fichero que va a tener de salida
            template: 'index.html', // opcional: si hay varios html de entrada, se selecciona esta propiedad para seleccionar el html de entrada
            hash: true, //al bundle le añade un token para evitar que se caché
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        port: 9004,
        contentBase: './src'
    }
};