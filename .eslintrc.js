module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'array-bracket-spacing': ['error', 'always', { 'singleValue': true }],
    'arrow-spacing': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': 'error',
    'eol-last': ['error', 'always'],
    'indent': ['error', 2],
    'max-len': 'error',
    'no-console': 'error',
    'no-duplicate-imports': 'error',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single'],
    'semi': 'error',
    'sort-imports': 'error',
    'space-infix-ops': 'error',
    'space-before-function-paren': 'error',
    'space-in-parens': ['error', 'never'],
    'template-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-empty-interface': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      files: ['*spec.js', 'webpack/index.babel.js', 'babel.config.js'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
