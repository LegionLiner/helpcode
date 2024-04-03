/* eslint @typescript-eslint/naming-convention: 0 */
const rules = {
    'no-console': [
        'error',
        { 'allow': ['debug', 'table', 'trace'] }
    ],
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    'no-undef': ['warn'],
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
};

module.exports = {
    env: {
        browser: true,
        commonjs: false,
        es6: true,
        node: true,
    },
    plugins: ['html'],
    settings: {},
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-essential'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022
    },
    ignorePatterns: [
        '**/dist/*.js',
        'vite*',
    ],
    rules: rules,
};