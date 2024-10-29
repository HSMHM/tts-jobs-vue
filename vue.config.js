const webpack = require('webpack');

// Export an empty configuration or keep any other relevant settings
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
      }),
      // Remove SitemapPlugin since it's now in vite.config.js
    ]
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
};
