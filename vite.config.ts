import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    base: '/test_mindbox/',
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@entities': path.resolve(__dirname, 'src/entities'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@utils': path.resolve(__dirname, 'src/utils')
        }
    },
    test: {
        environment: 'jsdom',
        setupFiles: './config/setupTests.ts',
        globals: true
    }
});
