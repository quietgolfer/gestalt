const babelJest = require('babel-jest');

/*
    @chrislloyd - This is a hack around jest not fully supporting webpack. You
    can check out the conversation I started here:

        https://github.com/facebook/jest/issues/334#issuecomment-200971002

    In the meantime we need to be careful to update this file when our
    `webpack.config.js` file changes.
*/
module.exports = {
  process(src, filename) {
    if (filename.match(/\.css$/)) {
      return '';
    }
    return babelJest.process(src, filename);
  },
};
