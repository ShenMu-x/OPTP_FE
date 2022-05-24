# 在线编程教学系统前端
- 概述
  - 基于 Vue3 + TypeScript + Less + Element-Plus 开发
  - 使用 yarn 管理项目
  - release为分支开发，master为稳定分支
- 项目安装说明 
  - 使用 git clone 拉取代码
  - 安装nodejs，开发使用版本为16.0.0
  - 使用npm i yarn -g 安装管理工具yarn
  - 进入optp_fe目录，使用yarn install安装依赖
  - 使用yarn run dev运行项目，进入 http://localhost:3600/ 访问
- 项目结构说明 
```
optp_fe
├─ index.html
├─ package.json
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ App.vue // 根组件
│  ├─ assets  // 静态文件目录
│  │  └─ scnulogo.png
│  ├─ components // 公共组件目录
│  │  ├─ comment // 评论相关
│  │  ├─ common // 基础功能
│  │  ├─ course 
│  │  └─ lab
│  ├─ Layout // 全局布局组件目录
│  │  ├─ index.vue
│  │  └─ logic.ts // 依赖注入全局数据逻辑
│  ├─ main.ts // 入口文件
│  ├─ pages // 页面组件
│  │  ├─ 404.vue
│  │  ├─ course 
│  │  │  ├─ comp // 课程页面子组件
│  │  │  └─ CourseDetail.vue
│  │  ├─ ide
│  │  ├─ login
│  │  ├─ manage // 管理员
│  │  ├─ oj // 语法练习
│  │  ├─ teach
│  │  └─ user
│  ├─ plugins // 插件目录
│  │  └─ element.ts
│  ├─ router // 路由配置
│  ├─ styles // 全局样式
│  ├─ type // 基本数据类型
│  └─ utils 
│     ├─ helper // 工具函数
│     │  ├─ hook // 包含状态维护的工具钩子函数
│     │  └─ index.ts
│     ├─ option // 可配置参数
│     ├─ services // 请求目录
│     │  ├─ axios.ts // axios配置
│     │  ├─ code.ts // 状态码
│     │  ├─ exportCsv.ts
│     │  ├─ index.ts
│     │  ├─ pack.ts // 请求相关公共pack
│     │  ├─ packCommon.ts // 自定义数据pack
│     │  ├─ refreshToken.ts
│     │  └─ type.ts //axios返回结果抽象类型定义
│     └─ storage // 存储
│        ├─ config.ts // 全局变量
│        ├─ index.ts 
│        ├─ localStorage.ts // 浏览器本地存储
│        └─ provide.ts // 依赖注入数据
├─ tsconfig.json
├─ vite.config.ts
└─ yarn.lock
```