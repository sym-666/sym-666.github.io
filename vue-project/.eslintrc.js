export default {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // 如果使用 Prettier，确保与其兼容
  ],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 自定义规则
    'vue/multi-word-component-names': 'off', // 关闭组件名称必须为多词的规则
    '@typescript-eslint/no-unused-vars': 'warn', // 未使用的变量警告
  },
  scripts: {
    lint: 'eslint --ext .js,.ts,.vue src',
    'lint:fix': 'eslint --ext .js,.ts,.vue src --fix',
  },
}
