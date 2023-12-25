# Eslint + Prettier-Eslint 插件
Eslint和Prettier-Eslint插件分别用于js，css的格式化，
关键配置文件 
.eslintrc和.prettierrc,这里面需要配置格式化的规则，通常使用airbnb的配置即可

.prettierrc
```
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 120,
  tabWidth: 2,
};
```

settings.json中配置自保存格式化，即可统一规则
```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true,
  "source.fixAll.stylelint": true
},
"css.lint.unknownAtRules": "ignore",
"scss.lint.unknownAtRules": "ignore"
```