module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@sanity/eslint-config-studio',
    'plugin:react/recommended',
    /* 'standard-with-typescript',
    'plugin:react/recommended', */
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, {extensions: ['.ts', '.tsx']}],
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
