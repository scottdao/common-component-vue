<template>
    <div >
        <form-component ref="form">
            <template v-slot:customer="{config:{data, formState}}">
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
        </form-component>
        <div style="text-align:right;">
            <a-button type="primary" @click="queryClick">
                确定
            </a-button>
            <a-button style="margin-left:20px;" @click="cancel">
                清空
            </a-button>
        </div>
    </div>
</template>
<script>
import { defineComponent, nextTick, onMounted, ref, toRaw } from 'vue'
import { FormComponent, setUseForm } from './components/index'
export default defineComponent({
    components:{
        FormComponent
    },
    setup() {
        const form = ref(null)
        const formParams = [
                {
                    label:"用户名",
                    filed:'username',
                    id:0,
                    component:{ 
                        name:'input', 
                        props:{
                            placeholder:"请输入你的用户名",
                            size:'small',
                        }
                    }
                },
                {
                    label:"信号值",
                    filed:'singalValue',
                    id:1,
                    component:{ 
                        name:'select', 
                        props:{
                            placeholder:"请选择信号值",
                            size:'small',
                            change:(v)=>{
                                console.log(v)
                            }
                        },
                        data:async ()=>[
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
                    id:2,
                    component:{ 
                        name:'datePicker',
                        props:{
                            placeholder:"请选择日期",
                            size:'default',
                        },
                    }
                },
                {
                    label:"时间范围",
                    filed:'times',
                    id:3,
                    component:{ 
                        name:'rangePicker',
                        props:{
                            placeholder:['开始日期', '结束日期'],
                            size:'small',
                        }
                    }
                },
                {
                    label:"自定义",
                    filed:'customer',
                    isSlotFlag:true,
                    id:4,
                    component:{}
                },
                {
                    label:"多选组件",
                    filed:'checkAll',
                    isSlotFlag:true,
                    id:5,
                    component:{}
                }
        ];
        const formState = {
                username:undefined,
                singalValue:undefined,
        };
        const formConfig = {
                rules:{
                    username:[{
                        required: true,
                        message: '请输入你的名字',
                        trigger: 'blur'
                    }],
                    singalValue:[{
                        required: true,
                        message: '请选择信号',
                        trigger: 'blur'
                    }],
                    timer:[{
                        required: true,
                        message: '请选择日期',
                        trigger: 'blur'
                    }]
                },
                hideRequiredMark:false,
                labelAlign:'right',
                // locale:'ch' // en:英文  ch:中文
        }
        const queryClick = ()=>{
            const { useForm } = form.value
            const form_value = useForm()
            const v = form_value.getFieldsValue()
            console.log(v, 77666)
        }
        const cancel = ()=>{
             const { clearFileds } = form.value
             clearFileds()
        }
        onMounted(async ()=>{
            const { setFiledValues } = form.value
            setFiledValues({username:123321, singalValue:'is'})
        })
        setUseForm({
            formParams,
            formState,
            formConfig,
            formItemConfig:{}
        })
        return {
            queryClick,
            form,
            cancel
        }
    },
})
</script>
<style scoped>

</style>
