module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //默认已经配置@别名
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
