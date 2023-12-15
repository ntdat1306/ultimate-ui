import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import alias from '@rollup/plugin-alias';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';

import path from 'path';

const packageJson = require('./package.json');

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            terser(),
            // Resolve alias
            alias({
                entries: [
                    { find: '@components', replacement: path.resolve(__dirname, './src/components') },
                    { find: '@contexts', replacement: path.resolve(__dirname, './src/contexts') },
                    { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
                    { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
                ],
            }),
            // Copy folder
            copy({
                targets: [{ src: 'src/utils/styles', dest: ['dist/esm/types/utils', 'dist/cjs/types/utils'] }],
                // targets: [{ src: ['src/utils/styles/*', '!**/*.js'], dest: 'dist/esm/types/utils' }],
            }),
            // Clean dist or other folders and files before bundling
            del({ targets: 'dist/*' }),
        ],
        external: ['react', 'react-dom'],
    },
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts.default()],
    },
];
