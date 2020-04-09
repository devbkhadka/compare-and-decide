const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => ({
    assetPrefix: PHASE_DEVELOPMENT_SERVER===phase ? '' : '/compare-and-decide-static/'
})