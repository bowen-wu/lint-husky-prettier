# 统一代码风格

## Eslint
Find and fix problems in your JavaScript code.

1. Install
    ```
    yarn add eslint --dev
    ```

2. Set up a configuration file
    ```
    yarn run eslint --init 
    ```
   创建 ` .eslintrc.js ` 文件，并使用 eslint-plugin-react, @typescript-eslint/eslint-plugin, eslint-config-airbnb, eslint,
   eslint-plugin-import, eslint-plugin-jsx-a11y, eslint-plugin-react-hooks, @typescript-eslint/parser 等 package

   'off' or 0 - turn the rule off
   
   'warn' or 1 - turn the rule on as a warning (doesn't affect exit code)
   
   'error' or 2 - turn the rule on as an error (exit code will be 1)

3. View .eslintrc.js
    ```
    module.exports = {
        "parser": {},  //定义ESLint的解析器
        "extends": [], // 定义文件继承的子规范
        "plugins": [], // 定义了该eslint文件所依赖的插件
        "env": {},
        "rules": {}
    }
    ``` 

4. Individual Rules
    ```
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'comma-dangle': ['error', 'never'],
        'react/jsx-indent': ['error', 4],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'react/jsx-tag-spacing': [
            'error',
            {
                closingSlash: 'never',
                beforeSelfClosing: 'allow',
                afterOpening: 'never',
                beforeClosing: 'allow',
            },
        ],
        'object-curly-spacing': ['warn', 'never'],
        'react/jsx-filename-extension': [
            'warn',
            { extensions: ['.js', '.jsx'] },
        ],
        'react/jsx-indent-props': ['off', 'tab'],
        'no-use-before-define': 'off',
    }
    ```

5. [All Rules](https://eslint.org/docs/rules/)

6. Ignore
    ```
    touch .eslintignore
   
    // .eslintignore
    .eslintrc.js
    ```

### Plugin
1. [airbnb](https://github.com/airbnb/javascript#whitespace--spaces)

## Prettier
Prettier is an opinionated code formatter.

1. Install
    ```
    yarn add --dev --exact prettier
    ```

2. Config file
    ```
    touch .prettierrc.js
   
    // .prettierrc.js
    module.exports = {
      ...fabric.prettier,
      "singleQuote": true,
      "trailingComma": "all",
      "printWidth": 80,
    };
    ```

3. Ignore file
    ```
    touch .prettierignore

    // .prettierignore
    # Ignore artifacts:
    build
    **/*.md
    **/*.svg
    **/*.ejs
    **/*.html
    package.json
    ```

## Eslint VS Prettier
这里说下 Eslint 与 Prettier 之间的区别，二者的侧重点不同，前者是代码规范检查，如是否可以使用 var，尾逗号，函数括号前面是否留空格，便于团队保
持比较统一的代码风格，而 Prettier 则是代码格式化插件，可以根据一定的规则对我们的 js、css、less、jsx、vue 等文件进行格式化，保证团队输出的代
码是统一的，所以二者除了小部分规则有交集之外，二者是可以在我们的开发种相辅相成的。

use Prettier for formatting and linters for catching bugs!

## [Husky](https://github.com/typicode/husky)
Husky improves your commits and more 🐶 woof!

You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push. Husky supports
[all Git hooks](https://git-scm.com/docs/githooks).

Husky 是一个 git 钩子插件，支持所有的 Git Hooks 钩子，我们可以在这些钩子触发的时候执行某些命令或者操作

1. Install
    ```
    yarn add husky@next --dev
    ```

2. Enable Git hooks
    ```
    yarn husky install
    ```
3. Edit ` package.json `
    ```
    {
      "private": true,
      "scripts": {
        "husky-test": "echo 'Hello world!'",
        "postinstall": "husky install"
      }
    }
    ```
4. Add a Hook
    ```
    npx husky add .husky/pre-commit "yarn husky-test"
    ```

   Husky 只是提供了提交时的钩子，然而有时候我们处理的项目并不是新项目，这个时候，可能只想对本次提交的代码，做代码检查，而不是对现有目录内所有
   的文件做检查，所以我们需要引入 lint-staged 这个插件

## [lint-staged](https://github.com/okonet/lint-staged#readme)
Run linters against staged git files and don't let 💩 slip into your code base!

1. Install
    ```
    yarn add lint-staged --dev
    ```

2. Configuration
    ```
    touch .lintstagedrc.js
    ```

3. Edit script
    ```
    // package.json
    script: {
        ...
        "lint-staged": "lint-staged",
        "lint": "npm run lint:js && npm run lint:prettier",
        "lint:js": "eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
        "lint:prettier": "check-prettier lint",
        "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx",
        "lint:fix": "eslint --fix --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
        "prettier": "prettier -c --write \"**/*\""
    }
    ```

4. Filtering files
    ```
    module.exports = {
        "**/*.{js,jsx,tsx,ts,scss,md,json}": [
            "prettier --write",
            "git add"
        ],
        "**/*.{js,jsx}": "yarn lint-staged:js",
        "**/*.{js,ts,tsx}": "yarn lint-staged:js"
    }
    ```

5. Edit pre-commit
    ```
    yarn lint-staged
    ```

## Commitlint
Helps your team adhering to a commit convention.

1. Install
   ```
   yarn add @commitlint/{cli,config-conventional} -D 
   ```

2. Configuration
   ```
   touch .commitlintrc.js

   // .commitlintrc.js
   module.exports = {
     extends: ['@commitlint/config-conventional'],
     rules: {
       'type-enum': [
         2,
         'always',
         [
           'feat', // 新功能（feature）
           'fix', // 修补bug
           'docs', // 文档（documentation）
           'style', //  格式（不影响代码运行的变动）
           'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
           'test', // 增加测试
           'chore', // 构建过程或辅助工具的变动
         ],
       ],
       'scope-empty': [1, 'always'],
       'body-leading-blank': [2, 'always'],
       'footer-leading-blank': [2, 'always'],
     },
   };
   ```

3. Husky
   ```
   npx husky add .husky/commit-msg "yarn commitlint --edit"
   ```
   
## Individual plugin

[How to create eslint plugin](https://eslint.org/docs/developer-guide/working-with-plugins#create-a-plugin)

[generator-eslint](npmjs.com/package/generator-eslint)

### Eslint plugin
1. Install 
   ```
   npm i -g yo
   npm i -g generator-eslint
   ```
   
2. Create empty file
   ```
   mkdir eslint-plugin-demo
   cd eslint-plugin-demo
   ```
   
3. Eslint:plugin
   ```
   yo eslint:plugin
   ```
   
4. Eslint:rule
   ```
   yo eslint:rule
   ```
