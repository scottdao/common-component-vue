<template>
    <div>
        <common-form :formParams='forms'>
            <template v-slot="{data}" > 
                <!-- 使用具名插槽与作用域插槽实现自定义组件 -->
              <slot :name="data.filed" :config='{data, formState:forms.formState}' ></slot>
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
        onMounted(()=>{
            // console.log(forms, 4545435)
        })
        return {
            forms
            // ...toRefs(state)
        }
    },
})
</script>
