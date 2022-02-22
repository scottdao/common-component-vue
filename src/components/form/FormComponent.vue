<template>
    <div>
        <common-form :formParams='forms'>
            <template v-slot="{data}" > 
                <!--  使用具名插槽与作用域插槽实现自定义组件 -->
                <!-- @slot name自定义组件名  -->
              <slot :name="data.filed" :config='{data, formState:forms.formState}' ></slot>
              <!-- @slot config添加数据传值 -->
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
    toRaw,
    nextTick
} from 'vue'
import CommonForm from './index.vue';
import { useForm } from './index'
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
        const forms = useForm()
        /**
         * useForm():获取form校验方法
         * @param {Event} e
         * @public
        */
        const use_form = ()=>{
            return forms.formRef.value
        }
         /**
         * 设置form字段为空
         * @param {Event} e
         * @public
        */
        const clearFileds = ()=>{
            const values = forms.formState.value
            Object.keys(values).forEach(keys => {
                values[keys] = undefined
            });
        }
        /**
         * 设置form字段为空
         * @param {Event} values:Obejct
         * @public
        */
        const setFiledValues = async (values)=>{
            await nextTick()
            const _values = forms.formState.value
            Object.keys(values).forEach(keys => {
                _values[keys] = values[keys]
            });
        };
        // console.log(forms, 998777)
        return {
            forms,
            useForm:use_form,
            clearFileds,
            setFiledValues
        }
    },
})
</script>
