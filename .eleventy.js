const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const pimport = require('postcss-import');

module.exports = (config) => {
  config.addTemplateFormats('css');

  config.addExtension('css', {
    outputFileExtension: 'css',
    compile: async (inputContent, inputPath) => {
      let output = await postcss([
        pimport,
        autoprefixer,
        csso
      ]).process(inputContent, { from: inputPath });

      return async () => {
        return output.css;
      }
    }
  });

  // Config

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data'
    },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: [
      'md', 'njk'
    ],
  };
};
