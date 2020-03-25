const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
    fixBabelImports("import", {
      libraryName: "babel-plugin-react-intl-auto222"
    })
)