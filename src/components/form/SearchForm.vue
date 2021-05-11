<template>
    <div>
        <common-form :formParams='formParams'>
            <template v-slot="{data}" > 
                <!-- 使用具名插槽与作用域插槽实现自定义组件 -->
              <slot :name="data.filed" :config='{data, formState:formParams.formState}' ></slot>
            </template>
            <template v-slot:button="{config}">
                <div style="text-align:right;">
                    <a-button
                    style="margin-right: 10px"
                    type="primary"
                    @click="searchQuery(config)"
                    >
                        <template #icon><SearchOutlined /></template>查询
                    </a-button>
                    <span v-if="formParams.isFlagLimit">
                        <a-button
                        @click="resetQuery"
                        >
                            <template #icon><RedoOutlined /></template>重置
                        </a-button>
                        <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
                            <span v-if="isExpand">
                                折叠<UpOutlined />
                            </span>
                            <span v-else>
                                展开<DownOutlined />
                            </span>
                        </a>
                    </span>
                </div>
            </template>
        </common-form>
    </div>
</template>
<script lang="js">
import { 
    defineComponent,
    onMounted,
    reactive,
    toRefs,
    watch,
    toRaw
} from 'vue'
import CommonForm from './index.vue';
import { useFormParams } from './index'
import {
        SearchOutlined,
        RedoOutlined,
        UpOutlined,
        DownOutlined
} from '@ant-design/icons-vue';
import _ from 'lodash';
export default defineComponent({
    components:{
        CommonForm,
        SearchOutlined,
        RedoOutlined,
        UpOutlined,
        DownOutlined
    },
    setup(props, context) {
        const state = reactive({
            isExpand:false,
            // formParams:[]
            params:[]
        })
        const formParams = useFormParams()
        const { formState, formRef, formParams:params, noExpandFn, expandFn, isFlagLimit }  = formParams
        const resetQuery = ()=>{
            formRef.value.resetFields()
            context.emit('resetQuery')
        }
        const searchQuery = (config)=>{
            const values = formRef.value.getFieldsValue()
            context.emit('searchQuery', { ..._.omit(values, ['button']) })
        }
        onMounted(()=>{
            if(!state.isExpand){
                noExpandFn();
            }else{
                expandFn()
            }
        })
        const toggle = ()=>{
            if(state.isExpand){
                noExpandFn()
            }else{
                 expandFn()
            }
            state.isExpand = !state.isExpand
        }
        return {
            formParams:{
                ...formParams
            },
            resetQuery,
            searchQuery,
            toggle,
            ...toRefs(state)
        }
    },
})
</script>
