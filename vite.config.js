import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    build: {
        outDir: 'dist',
        emptyDirBeforeWrite: true,
        lib: {
            entry: resolve(__dirname, 'resources/js/spire-ui.js'),
            name: 'SpireUI',
            formats: ['es', 'iife'],
            fileName: (format) => `spire-ui.${format === 'es' ? 'esm' : format}.js`,
        },
        rollupOptions: {
            external: ['alpinejs'],
            output: {
                globals: {
                    alpinejs: 'Alpine',
                },
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') {
                        return 'spire-ui.css';
                    }
                    return assetInfo.name;
                },
            },
        },
        cssCodeSplit: false,
        sourcemap: true,
    },
});
