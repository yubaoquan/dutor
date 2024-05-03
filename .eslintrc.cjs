/* eslint-env node */
// eslint-disable-next-line import/no-extraneous-dependencies
require('@rushstack/eslint-patch/modern-module-resolution');

// 此文档解释了上面的 require 是做什么用的 https://zqy233.github.io/zqy-blog/1.%E5%9F%BA%E7%A1%80/%E9%A1%B9%E7%9B%AE%E8%A7%84%E8%8C%83%E5%8C%96/eslint.html#%E4%BB%80%E4%B9%88%E6%98%AF-rushstack-eslint-patch

module.exports = {
  root: true,
  extends: [
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-ts/eslint-recommended',
    '@vue/eslint-config-prettier',
    '@vue/eslint-config-prettier/skip-formatting',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-typescript/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  plugins: ['@typescript-eslint', 'prettier', 'import', 'typescript-sort-keys'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
    ecmaVersion: 'latest',
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@main', './src/main'],
          ['@renderer', './src/renderer/src'],
        ],
        extensions: ['.ts', '.mjs'],
      },
    },

    // https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#importcore-modules
    'import/core-modules': ['@intlify/unplugin-vue-i18n/messages'],
  },
  rules: {
    'prettier/prettier': 'error',
    'no-plusplus': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'no-loop-func': 'off',
    'consistent-return': 'off',
    'no-async-promise-executor': 'off',
    'no-promise-executor-return': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true, optionalDependencies: false, peerDependencies: false },
    ],
    '@typescript-eslint/no-loop-func': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-param-reassign': ['error', { props: false }],
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-use-before-define': ['error', { ignoreTypeReferences: false }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { args: 'after-used', destructuredArrayIgnorePattern: '^_' },
    ],
    'typescript-sort-keys/string-enum': ['error', 'asc', { caseSensitive: true }],
    'typescript-sort-keys/interface': 'error',

    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: { array: false, object: true },
        AssignmentExpression: { array: false, object: false },
      },
      { enforceForRenamedProperties: false },
    ],

    'lines-around-comment': [
      'error',
      {
        allowArrayStart: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        beforeBlockComment: true,
        beforeLineComment: true,
      },
    ],

    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'class', next: '*' },
      { blankLine: 'always', prev: '*', next: 'class' },
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: '*', next: 'export' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      { blankLine: 'any', prev: 'export', next: 'export' },
    ],

    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index'],
      },
    ],
  },
};
