const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {

    const pathPrefix = PHASE_DEVELOPMENT_SERVER===phase ? '' : '/compare-and-decide-static'
    return {
        assetPrefix: pathPrefix+'/',
        webpack(config, { dev }) {
            config.module.rules = [...config.module.rules,
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                    {
                        loader: 'file-loader',
                        options: { publicPath: pathPrefix+'/_next/static/images', outputPath: 'static/images' }
                    },
                    ],
                }
            ]
            return config
        }
    }
}