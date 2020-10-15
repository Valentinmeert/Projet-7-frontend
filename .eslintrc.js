module.exports = {
  extends: [
    'airbnb',
    "plugin:vue/recommended",
  ],
  plugins: [
    'prettier',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', '.'],
          ['@', '.'],
        ],
      },
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
