const camelCase = require('camelcase');
const sourcemaps = require('rollup-plugin-sourcemaps');
const {uglify} = require('rollup-plugin-uglify');

const name = require('./package.json').name;

const plugins = [
    sourcemaps()
];

if (process.env.UGLIFY) {
    plugins.push(...[
        uglify()
    ]);
}

export default {
    plugins,
    output: {
        name: camelCase(name),
        // The key here is library name,and the value is the the name of the global variable name the window object.
        // See https://github.com/rollup/rollup/wiki/JavaScript-API#globals for more.
        globals: {
            // TS
            'tslib': 'tslib'
        },
        sourcemap: true
    },
    // List of dependencies
    // See https://github.com/rollup/rollup/wiki/JavaScript-API#external for more.
    external: [
        // TS
        'tslib'
    ]
};
