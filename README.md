# 前端代码风格统一方案

## 背景

随着前端应用的大型化和复杂化，越来越多的前端工程师和团队开始重视 JavaScript 代码规范。ESLint 是一款插件化的 JavaScript 代码静态检查工具， 其核心是通过对代码解析得到的 AST（Abstract Syntax
Tree，抽象语法树）进行模式匹配，定位不符合约定规范的代码。可以根据个人/团队的代码风格进行
配置，如果想降低配置成本，也可以直接使用开源配置方案，例如 [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)。
之后再搭配一些辅助工具（例如 husky 和 lint-staged），可以使得整个流程会更加顺畅。

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

Use Prettier for formatting and linters for catching bugs!

## [Husky](https://github.com/typicode/husky)

Husky improves your commits and more 🐶 woof!

You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push. Husky supports
[all Git hooks](https://git-scm.com/docs/githooks).

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

## 进阶

如果想要让整个公司规模化地应用统一的 JavaScript 代码规范，问题就会变得较为复杂

### 问题分析

技术层面

- **技术选型分散** - 团队内工程技术选型往往并不统一，如 React/Vue、JavaScript/TypeScript 等。
- **技术场景更加广泛** - 对于大型团队，其开发场景一般不会局限在传统 Web 领域内，往往还会涉及 Node.js、React Native、小程序、桌面应用
  （例如 Electron）等更广泛的技术场景。
- **工程数量的增加和工程方案离散化导致 ESLint 方案的复杂度提升** - 这样会进一步增加工程接入成本、升级成本和方案维护成本。

### 需要解决的问题
如何制定统一的代码规范和对应的 ESLint 配置？
- **场景支撑** - 如何实现对场景差异的支持？如何保证不同场景间一致部分（例如 JavaScript 基础语法）的规范一致性？
- **技术选型支撑** - 如何在支撑不同技术选型的前提下，保证基础规则（例如缩进）的一致性？
- **可维护性** - 具体到规则配置上，能否提升可复用性？在方案升级迭代时成本是否可控？


### 解决方案

![代码风格统一方案](https://upload-images.jianshu.io/upload_images/9617841-8c0a429b9437e117.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- **基础层** - 制定统一的基础语法和格式规范，提供通用的代码风格和语法规则配置，例如缩进、尾逗号等等。
- **框架支撑层（可选）** - 提供对通用的一些技术场景、框架的支持，包括 React、Vue 等；这一层借助开源社区的各种插件进行配置，并对各种框架的规则
  都进行了一定的调整。
- **TypeScript 层（可选）** - 这一层借助 typescript-eslint，提供对 TypeScript 的支持。
- **适配层（可选）** - 提供对特殊场景的定制化支持，例如配合 prettier 使用、或者某些团队的特殊规则诉求。 
  
具体的实际项目中，可以灵活的选择各层级、各类型的搭配，获得和项目匹配的 ESLint 规则集。最终，形成了如下所示的 ESLint 配置集：

![Eslint 配置集](https://upload-images.jianshu.io/upload_images/9617841-0f8e841d23b2df4d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这种通过分层、分类的结构设计，还有利于后期的维护：

- 对基础层的修改，只需修改一处即会全局生效。
- 对非基础层某一部分的调整不会产生关联性的影响。
- 如需扩展对某一类型的支持，只需关注这一类型的特殊规则配置。

## Individual Plugin 

[eslint-plugin-bowen-lint](https://www.npmjs.com/package/eslint-plugin-bowen-lint)

### [How to create eslint plugin](https://eslint.org/docs/developer-guide/working-with-plugins#create-a-plugin)

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

[generator-eslint](npmjs.com/package/generator-eslint)

### Why Plugin not Config?

* Plugins - which third-party plugins define additional rules, environments, configs, etc. for ESLint to use.
* Rules - which rules are enabled and at what error level.
* Config -> extends
  -> [Extending Configuration File](https://eslint.org/docs/user-guide/configuring/configuration-files#extending-configuration-files)
  -> A configuration file, once extended, can inherit all the traits of another configuration file (including rules,
  plugins, and language options) and modify all the options.


## 代码集成检查
在代码 Commit 时，通过 GitHook 触发 ESLint 检查。其优点在于能实时响应开发者的动作，给出反馈，快速定位和修复问题；缺陷在于开发者可以主动跳过检查。
使用 Husky + Lint-staged 结合，在代码 Commit 时，通过 GitHook 触发对 git 暂存区文件的检查。

## Individual Config
[commitlint-config-bowen-lint](https://www.npmjs.com/package/commitlint-config-bowen-lint)
