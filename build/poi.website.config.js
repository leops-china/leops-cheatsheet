const path = require('path')
const pkg = require('../package')

module.exports = {
  entry: 'website/index.js',
  output: {
    dir: 'docs',
    html: {
      title: 'Leops'
    }
  },
  publicFolder: path.join(__dirname, '../website/docs'),
  chainWebpack(config) {
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')
  },
  constants: {
    __DOCUTE_VERSION__: JSON.stringify(pkg.version),
    __PRISM_VERSION__: JSON.stringify(require('prismjs/package').version),
    __DEPS__: JSON.stringify(Object.keys(pkg.dependencies))
  }
}
