module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier/@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-explicit-any': 2,
    'import/order': [
      1,
      {
        groups: [
          ['builtin', 'external', 'internal', 'unknown'],
          ['parent', 'sibling', 'index']
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        'newlines-between': 'always'
      }
    ],
    'import/first': 2
  }
}
