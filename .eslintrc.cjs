module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json'
  },
  plugins: ['import', 'vue'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'import/no-unresolved': 'error',
    'import/no-duplicates': 'warn',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off'
  }
}
