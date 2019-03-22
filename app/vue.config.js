const fs = require('fs')
const path = require('path')

const writeConfigFile = (content) => {
  fs.writeFileSync('./dev/webpackDevConfig.json', content)
}

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
      writeConfigFile(JSON.stringify(config))
      config.devServer = {
        proxy: {
          '/api': {
            target: 'http://localhost:7000',
            pathRewrite: {
              '^/api': '/api'
            }
          }
        }
      }
    }
    config.resolve.mainFiles = ['index']
    config.resolve.alias = {
      ...config.resolve.alias,
      '@views': path.resolve(__dirname, './src/views'),
      '@extensions': path.resolve(__dirname, './src/extensions'),
      '@plugin': path.resolve(__dirname, './src/plugin'),
      '@components': path.resolve(__dirname, './src/components'),
      '@router': path.resolve(__dirname, './src/router'),
      '@admin': path.resolve(__dirname, './src/views/admin'),
      '@utils': path.resolve(__dirname, './src/assets/utils'),
      '@style': path.resolve(__dirname, './src/assets/style'),
      '@img': path.resolve(__dirname, './src/assets/img')
    }
  }
}
