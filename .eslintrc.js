module.exports = {
  root: true,
  env: {
    browser: true, // browser global variables
    es2021: true, // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
  },
  extends: ['plugin:vue/vue3-recommended', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    parser: 'babel-eslint',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  plugins: ['vue'],
  rules: {
    // Define your own rules
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境禁用consele
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境禁用debugger
    'linebreak-style': 'off', // 忽略检测换行风格
    'import/no-unresolved': 'off', // 关闭路径解析
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }], // 关闭dev npm包警告
    'import/prefer-default-export': 'off', // 模块只输出一个变量时，是否需要添加default
    'max-len': ['error', 150], // 行长度
    'no-use-before-define': 'off', // 允许定义之前使用
    'no-plusplus': 'off', // 一元运算符
    'no-unused-vars': 'off', // 允许声明未使用
    'func-names': 'off', // 允许使用匿名函数
    'prefer-destructuring': ['error', { object: true, array: false }], // 允许数组通过下标取值
    'no-param-reassign': ['error', { props: false }], // 允许修改参数中的属性值
    'no-shadow': ['error', { allow: ['state'] }], // 允许对其进行阴影处理
    // 'class-methods-use-this': 'off', // 自己加的，忘记是啥了
  },
  overrides: [
    {
      files: ['*.vue', '*.js'],
      rules: {
        // 这里写覆盖vue文件的规则
        'vue/max-attributes-per-line': 'off', // 关闭强制标签属性换行
        'vue/singleline-html-element-content-newline': 'off', // 关闭强制标签内容换行
      },
    },
  ],
};
