<template>
<div>
 <div style="background-color:#ddd;padding:20px;">
    <search-form 
            @searchQuery='queryClick' 
            @resetQuery='resetScreen' 
            :isDefaultExpand='true'
    >
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
 <div style="background-color:#ddd;padding:20px;width:600px;margin:30px auto;">
      <FormComponentTest />
 </div>
 <div>
     <rich-editor />
 </div>
 <Button type="primary" @click="()=>{setCount()}">嗲你家</Button>
 {{startCount}}
</div>
</template>
<script >
import {
    defineComponent,
    toRaw,
    ref,
    onBeforeUpdate,
    onUpdated,
    watchEffect,
    onRenderTracked,
    onRenderTriggered,
    onMounted,
    onUnmounted
} from 'vue'
import  { SearchForm, useFormSearch }  from './components/index.js'
import FormComponentTest from './form-compoent-test.vue'
import RichEditor from './RichText'
import { useState, useEffect } from './components/index'
export default defineComponent({
    components:{
        SearchForm,
        FormComponentTest,
        RichEditor
    },
    setup(){
        const [startCount, setStartCount] = useState(0)
        const [count, setCount] = useState('we')
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
                                size:'small',// default 32
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
                                size:'large',// default 32
                                change:(e)=>{
                                    console.log(e);
                                }
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
        useEffect(()=>{
            console.log(startCount, count)
            return ()=>{
                console.log('销毁')
            }
        }, [startCount, count])
        onUnmounted(()=>{
            console.log('--99088--')
        })
        useFormSearch({
            formParams,
            formState,
            formConfig,
            formItemConfig:{
                wrapperCol:{
                    span:18
                },
                labelCol:{
                    span:6
                }
            }
        })
        return {
            queryClick:(value)=>{
                console.log(value, 7665)
            },
            resetScreen:(value)=>{
                // console.log(value)
            },
            setCount:()=>{
                setStartCount(2)
                setCount('my')
                // console.log(startCount)
            },
            startCount

            // formState
        }
    }
})
</script>
<style lang="less">

</style>
