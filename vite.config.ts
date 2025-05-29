import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    base: '/test_mindbox/',
    resolve: {
        alias: {
            '@Components': path.resolve(__dirname, 'src/components'),
            '@Entities': path.resolve(__dirname, 'src/entities'),
            '@Hooks': path.resolve(__dirname, 'src/hooks')
        }
    },
    test: {
        environment: 'jsdom',
        setupFiles: './config/setupTests.ts',
        globals: true
    }
});
