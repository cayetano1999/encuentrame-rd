const webpack = require('webpack');
module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "stream": false,
  })
  config.resolve.fallback = fallback;
  return config;
}