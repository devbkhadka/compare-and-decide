const path = require('path')

module.exports={
    mode: 'development',
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, './src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /__test__\/*/],
                use: {
                    loader: 'babel-loader'
                }
                
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/, /__test__\/*/],
                use: {
                    loader: 'css-loader'
                }
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, './public'),
    },
}
