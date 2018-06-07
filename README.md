# vue-webpack-boilerplate for own

> 本模版是基于[官方模版](http://vuejs-templates.github.io/webpack)Fork后改造后用于自身的项目定制话的模版（主要适用于移动或者微信公众号开发）

> 模版架构是基于vue2 + webpack3 + axios + vue-router(可选) + vuex(可选) + vux(可选一个UI框架) + 微信公众号相关的配置（可选）+（后面部分同官网）

>模版后续回添加一些公用方法，环境配置等等，模版将根据具体场景继续优化

## Usage

同官方模版一样依赖于  [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
$ vue init ehre-zheng/webpack my-project
$ cd my-project
$ npm install
$ npm run dev
```

模版默认用的是`master` 主分支. 如果想使用最新的模版请使用一下命令替换

``` bash
$ vue init ehre-zheng/webpack#vue-tpl-M001 my-project
```

:warning: ** vue-tpl-M001 分支并不是稳定版本，请注意**

# Project Structure

``` bash
.
├── build/                      # webpack config files
│   └── ...
├── config/
│   ├── index.js                # main project config
│   └── ...
├── src/
│   ├── main.js                 # app entry file
│   ├── App.vue                 # main app component
│   ├── router/                 # router components
│   │   └── ...
│   ├── store/                  # vuex
│   │   └── ...
│   ├── components/             # ui components
│   │   └── ...
│   └── assets/                 # module assets (processed by webpack)
│       └── ...
├── static/                     # pure static assets (directly copied)
├── test/
│   └── unit/                   # unit tests
│   │   ├── specs/              # test spec files
│   │   ├── eslintrc            # config file for eslint with extra settings only for unit tests
│   │   ├── index.js            # test build entry file
│   │   ├── jest.conf.js        # Config file when using Jest for unit tests
│   │   ├── karma.conf.js       # test runner config file when using Karma for unit tests
│   │   └── setup.js            # file that runs before Jest runs your unit tests
│   └── e2e/                    # e2e tests
│   │   ├── specs/              # test spec files
│   │   ├── custom-assertions/  # custom assertions for e2e tests
│   │   ├── runner.js           # test runner script
│   │   └── nightwatch.conf.js  # test runner config file
├── .babelrc                    # babel config
├── .editorconfig               # indentation, spaces/tabs and similar settings for your editor
├── .eslintrc.js                # eslint config
├── .eslintignore               # eslint ignore rules
├── .gitignore                  # sensible defaults for gitignore
├── .postcssrc.js               # postcss config
├── index.html                  # index.html template
├── package.json                # build scripts and dependencies
└── README.md                   # Default README file
```


### Fork It And Make Your Own

You can fork this repo to create your own boilerplate, and use it with `vue-cli`:

``` bash
vue init username/repo my-project
```
