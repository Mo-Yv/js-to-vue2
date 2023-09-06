const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 暂时关闭语法检查
  lintOnSave: false
})
