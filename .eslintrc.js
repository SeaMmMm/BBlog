module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'warn',
    'no-debugger': 'warn',
    'no-unused-vars': 'warn',
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        printWidth: 80,
        tabWidth: 2,
        arrowParens: 'avoid'
      }
    ]
  }
}
