import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    base: '/test_mindbox/',
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'src/app'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@widgets': path.resolve(__dirname, 'src/widgets'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@entities': path.resolve(__dirname, 'src/entities'),
            '@shared': path.resolve(__dirname, 'src/shared')
        }
    },
    test: {
        environment: 'jsdom',
        setupFiles: './config/setupTests.ts',
        globals: true,
        coverage: { exclude: ['**/index.ts', '**/main.tsx', '**/App.tsx'], include: ['**/src'] }
    }
});
