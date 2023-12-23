const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
//const DeadCodePlugin = require('webpack-deadcode-plugin')

module.exports = (env, { mode }) => ({
    entry: './src/index.ts',
    resolve: {
        plugins: [
            new TsconfigPathsPlugin({
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            }),
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devtool: mode === 'development' ? 'source-map' : undefined,
    output: {
        filename: 'bundle.js',
        globalObject: 'this',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './templates/index.html'
        }),
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            __mode__: JSON.stringify(mode)
        }),
        new webpack.ProvidePlugin({
            'BABYLON': 'babylonjs'
        }),
        // new DeadCodePlugin({
        //     exclude: ['**/node_modules/**'],
        //     exportJSON: './analysis',
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            { test: /\.(obj|glb|FBX|fbx|3DS|3ds|exr|jpg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/'
                    }
                }]
            },
        ],
    },
});
