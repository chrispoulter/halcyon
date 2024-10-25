import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import vitest from 'eslint-plugin-vitest';
import playwright from 'eslint-plugin-playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const config = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    eslintPluginPrettierRecommended,
    {
        files: ['src/__tests__/**'],
        plugins: {
            vitest
        },
        rules: {
            ...vitest.configs.recommended.rules
        }
    },
    {
        ...playwright.configs['flat/recommended'],
        files: ['e2e/**'],
        rules: {
            ...playwright.configs['flat/recommended'].rules
        }
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 0
        }
    }
];

export default config;