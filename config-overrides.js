const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = (config, env) => {
    config.plugins.push(
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i,
            algorithm: 'gzip',
            filename: '[path].gz[query]',
        }),
        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html|svg)$/,
            minRatio: 0.8
        })
    )

    return config
}