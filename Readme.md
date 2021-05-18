# 组件库说明
## 概述
为了满足定制化的需求，提高代码的可复用性，设计一套基于antd的后台组件库。
### 版本号使用说明
- 修复某个组件bug及某个组件小需求更迭，0.0.x需要将最末尾版本加1
- 新增一个组件的需求迭代，0.x.0需要将中间版本加1(0.x.0启动)
- 涉及重大版本改版，组件的所有设计架构改版，x.0.0将第一个版本号加1（x.0.0启动）
## 如何使用
[私有npm仓库使用说明]()
## 基于antd-vue组件二次开发
[组件](https://www.antdv.com/components/button-cn/)
```
npm i @form-component/common-antd-vue
```
```
<div style="background-color:#ddd;padding:20px;">
    <search-form @searchQuery='queryClick' @resetQuery='resetScreen'>
        <template v-slot:customer="{config:{data, formState}}">
            <!-- 作用域插槽，自定义组件 -->
            <!-- 1234567896 -->
            <!-- {{data}}---{{formState}} -->
            <!-- {{formState.value}} -->
             <a-checkbox v-model:checked="formState.value.customer" style="line-height:32px;">Checkbox</a-checkbox>
        </template>
       <template v-slot:checkAll="{config:{data, formState}}">
           <a-checkbox-group v-model:value="formState.value.checkAll">
                <a-row>
                <a-col :span="8">
                    <a-checkbox value="A">A</a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="B">B</a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="C">C</a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="D">D</a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="E">E</a-checkbox>
                </a-col>
                </a-row>
            </a-checkbox-group>
       </template>
    </search-form>
 </div>
 <template>
 import { defineComponent, toRaw, ref } from 'vue'
import  { SearchForm, useFormSearch }  from '../lib/index.js'
export default defineComponent({
    components:{
        SearchForm
    },
    setup(){
            const formParams = [
                    {
                        label:"用户名",
                        filed:'username',
                        // isSlotFlag:true,
                        id:0,
                        component:{ 
                            name:'input', 
                            props:{
                                placeholder:"请输入你的用户名",
                                size:'default',// default 32
                                // change:()=>{}
                            },
                            // data:[]
                        }
                    },
                    {
                        label:"信号值",
                        filed:'singalValue',
                        // isSlotFlag:true,
                        id:1,
                        component:{ 
                            name:'select', 
                            props:{
                                placeholder:"请选择信号值",
                                // size:'default',// default 32
                                // change:()=>{}
                            },
                            data:[
                                {
                                    value:'is',
                                    label:'有',
                                    id:0
                                },
                                {
                                    value:'no',
                                    label:"否",
                                    id:1
                                }
                            ]
                        }
                    },
                    {
                        label:"日期",
                        filed:'timer',
                        // isSlotFlag:true,
                        id:0,
                        component:{ 
                            name:'datePicker',
                            props:{
                                placeholder:"请选择日期",
                                size:'default',// default 32
                                // change:()=>{}
                            },
                            // data:[]
                        }
                    },
                     {
                        label:"自定义",
                        filed:'customer',
                        isSlotFlag:true,
                        id:0,
                        component:{ 
                            // name:'datePicker',
                            // props:{
                            //     placeholder:"请选择日期",
                            //     size:'default',// default 32
                            //     // change:()=>{}
                            // },
                            // data:[]
                        }
                    },
                     {
                        label:"多选组件",
                        filed:'checkAll',
                        isSlotFlag:true,
                        id:4,
                        component:{ 
                            // name:'datePicker',
                            // props:{
                            //     placeholder:"请选择日期",
                            //     size:'default',// default 32
                            //     // change:()=>{}
                            // },
                            // data:[]
                        }
                    }
            ];
        const formState = {
                    username:undefined,
                    phone:undefined,
                    singalValue:undefined,
                    timer:undefined,
                    customer:false,
                    checkAll:[]
        };
        const formConfig = {
                    hideRequiredMark:false,
                    labelAlign:'right'
        }
        useFormSearch({
            formParams,
            formState,
            formConfig,
            formItemConfig:{}
        })
        return {
            queryClick:(value)=>{
                console.log(value, 7665)
            },
            resetScreen:(value)=>{
                // console.log(value)
            },
            // formState
        }
    }
})
</script>
```
## 文档
- `npx styleguidist server`可在本地查看
- 在线文档待补充
- component.data ===> array | function

## 贡献
### 代码规范
使用eslint作为代码规范自动化检查工具。为了构建方便，直接使用了airbnb的代码规范，再根据实际使用做定制化。
### 开发环境及构建工具
使用webpack作为构建工具。
### 发布


```
npm run build
npm publish --access public
```
### 文档
使用[styleguidist](https://vue-styleguidist.github.io/docs/GettingStarted.html#_1-install)作为文档及在线demo的生成工具。
### 目录结构
```
├── docs
│   ├── installation.md         // 安装说明
│   └── introduction.md
├── esm                         // es版本发布包
│   ├── form
│   │   ├── hooks
│   │   │   ├── index.js
│   │   │   ├── index.js
|   |   |   ├── install-antd.js
│   │   │   ├── SearchForm.vue
│   │   │   └── index.vue
│   └── index.js
├── lib                        // commonjs版本发布包
├── examples 
│   └── src
│       ├── index.html
│       └── index.js
├── src                        // 组件源码
│   ├── components
│   │   ├── form
│   │   │   ├── hooks
│   │   │   │   ├── index.js
│   │   │   ├── index.js
|   |   |   ├── install-antd.js
│   │   │   ├── SearchForm.vue
│   │   │   └── index.vue
│   │   └── index.js
│   ├── styleguide   
│   │   ├── Wrapper            // styleguide全局配置
│   ├── index.js
│   └── styles.css
├── styleguide
│   ├── build
│   │   └── bundle.4b0a7458.js
│   └── index.html
├── Readme.md
├── babel.config.js
├── package-lock.json
├── package.json
├── styleguide.config.js     // styleguide配置文件
└── webpack.config.js
```
### 测试
暂无
### 组件写法及规范
- 开发新组件在src/components下建立文件夹，使用**帕斯卡命名法**，如`SearchForm`
- 组件文件夹:
    <!-- - index.jsx为组件源码，组件接收的props使用**propTypes**进行类型检查，并为每个prop添加**jsDoc**注释 -->
    <!-- - 建议组件内部使用**styled-components**编写样式代码，也可以在组件文件夹内单独抽出style.css文件 -->
    <!-- - Readme.md为组件文档代码，[**styleguide**](https://react-styleguidist.js.org/docs/documenting.html#usage-examples-and-readme-files)根据它生成可交互的组件使用文档， -->
- 代码规范及其他
    - 使用airbnb规范，希望你在开发过程中自觉消除所有不符合规范的代码
    - 希望你的代码具有较高的**易读性，可维护性**，并为代码提供**详细易懂的注释**
    - 希望你在修改已有的组件时保证**兼容性**，并为修改部分提供**详细的注释**并且补充**文档和更新说明**
    - 希望你在添加组件时尽可能多的考虑适配性，可通用性，编写出**可供他人使用**的组件
### 开发流程
- 在src/components文件夹下开发组件，在src/index中引入需要测试的组件，并执行`npm run test`测试。
- 在对应组件下的Readme中编写组件的在线文档。执行`npm run doc:server`本地预览文档。
- 执行`npm run doc:build`生成组件库文档。

## 更新说明
### 0.1.0
`2021-04-26`
- 引入通用form表单，对接后台管理系统
### 0.1.3
`2021-05-05`
-  解决vue文件无法引入问题
### 0.1.4
`2021-05-06`
- 解决es新特性babel转码问题

### 0.1.5
`2021-05-06`
- 解决非空处理报错问题

### 0.1.6
`2021-05-06`
- 解决打包报错问题

### 0.1.7
- 判断数量少于3个重置按钮和折叠按钮不展现
### 0.2.7
- 新增组件FormComponent,多加了校验功能配置
### 0.2.8
- 添加formComponent清楚字段值为空
### 0.2.9
- 修改form-component组件清除字段值并非重置
### 0.3.0
`2021-05-18`
- 添加全局内置组件国际化配置
- 添加providerComponent组件
- 添加组件中增加data属性类型及类型判断，多元化传入组件数据
- 增加range-picker时间组件的配置
