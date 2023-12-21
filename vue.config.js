const { defineConfig } = require('@vue/cli-service')
// const fs = require('fs');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
      // changeOrigin: true,
      proxy: 'http://ec2-3-19-29-240.us-east-2.compute.amazonaws.com:8000/'
  }

})
// module.exports = {
//   devServer: {
//       proxy: 'https://localhost:8080'
//   } }
// module.exports = typeof self == 'object' ? self.FormData : window.FormData;