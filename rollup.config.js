import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import cssnano from 'cssnano';
import postcss from 'postcss';
import postcssCssnext from 'postcss-cssnext';
import postcssModules from 'postcss-modules';
import { readFileSync, writeFileSync } from 'fs';
import { extname } from 'path';
import { parseString } from 'xml2js';

const breakpoints = require('./src/breakpoints.json');

const svgPath = () => ({
  name: 'svgPath',
  load(id) {
    if (extname(id) !== '.svg') {
      return null;
    }

    const data = readFileSync(id, 'utf-8');

    return new Promise((resolve, reject) => (
      parseString(data, (err, result) => {
        if (err) {
          return reject(err);
        }

        const path = result.svg.path[0].$.d;
        const code = `export default '${path}';`;
        const ast = {
          type: 'Program',
          sourceType: 'module',
          start: 0,
          end: null,
          body: []
        };

        // Export as JS
        return resolve({ ast, code, map: { mappings: '' } });
      })
    ));
  },
});

const cssModules = (options = {}) => {
  const cssExportMap = {};
  const scopeNames = {};
  let css = '';

  const plugins = [
    postcssCssnext({
      features: {
        customMedia: {
          extensions: breakpoints,
        },
      },
    }),
    postcssModules({
      scopeBehavior: 'local',
      generateScopedName(name, filename) {
        const hash = filename + name;
        if (!Object.prototype.hasOwnProperty.call(scopeNames, hash)) {
          // base 36 encode the unique scope name
          const i = Object.keys(scopeNames).length;
          scopeNames[hash] = `_${i.toString(36)}`;
        }

        return scopeNames[hash];
      },
      getJSON(path, exportTokens) {
        cssExportMap[path] = exportTokens;
      },
    }),
  ];

  const postcssParser = postcss(plugins);

  return {
    name: 'cssModules',
    transform(code, id) {
      if (extname(id) !== '.css') { return null; }

      const opts = {
        from: id,
        to: id,
        parser: options.parser,
      };

      return postcssParser
        .process(code, opts)
        .then((result) => {
          // Append CSS to output
          css += result.css;

          // We can't yet export consts because some selector names aren't
          // valid js variable names (anything with a hyphen "foo-bar").
          const js = `
          export default ${JSON.stringify(cssExportMap[result.opts.from])};
          `;
          const map = { mappings: '' };
          return { code: js, map };
        });
    },

    ongenerate() {
      cssnano.process(css).then((result) => {
        writeFileSync(options.output, result.css);
      });
    }
  };
};


// ---


const plugins = [
  cssModules({
    output: 'dist/gestalt.css',
  }),
  nodeResolve(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development'
    ),
  }),
  svgPath(),
  json({
    preferConst: true,
  }),
  babel({
    babelrc: false,
    presets: [
      ['es2015', { modules: false }],
      'stage-1',
      'react',
    ],
  }),
];

export default {
  entry: 'src/index.js',
  moduleName: 'gestalt',
  external: [
    'react',
    'classnames/bind',
    'classnames',
    'react-dom'
  ],
  exports: 'named',
  targets: [
    { dest: 'dist/gestalt.js', format: 'umd' },
    { dest: 'dist/gestalt.es.js', format: 'es' },
  ],
  plugins,
  globals: {
    react: 'React',
    classnames: 'classnames',
    'classnames/bind': 'classnames',
    'react-dom': 'ReactDOM',
  },
  sourceMap: 'inline',
};
