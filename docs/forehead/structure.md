# 项目结构

```sh
#项目结构
├── docs
├── entry
│   ├── index.html        #项目主html文件
│   └── package-vue.html  #package用html文件
├── src
│   ├── App.vue           #App component
│   ├── boots.js          #加载第三方模块和样式
│   ├── build.js          #所有模块的整合加载文件
│   ├── components        #项目内部组件
│   ├── directives        #vue directives
│   ├── dll               #第三方dll bundle
│   ├── element-ui        #饿了么 ui
│   ├── factory           #工厂
│   ├── filters           #vue filters
│   ├── index.js          #项目主入口
│   ├── main              #主项目内容
│   ├── mixins            #vue mixins
│   ├── plugins           #vue 插件
│   ├── services          #服务器 services层
│   ├── store             #vuex store
│   ├── styles            #项目内部样式
│   ├── utils             #第三方utils
│   └── vendor            #打包成dll之前的第三方库存放处
├── test
│   ├── e2e               #e2e测试目录
│   └── unit              单元测试目录
```


