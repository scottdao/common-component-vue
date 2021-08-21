<template>
    <div class="rich-text">
        <rich-editor 
            :options='options'
            :insertTable='insertTable'
            @onFocus="onFocus"
            v-model:value="editValue"
           @onChange="onChange"
        >
        </rich-editor>
        <!-- {{editValue}} -->
    </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { RichEditor }from './components'
export default defineComponent({
    components:{
        RichEditor
    },
    setup() {
        const data = reactive({
             editValue:'12313123123',
            //  content:'12312'
        })
        return {
            options:{
            },
            insertTable:[5,5],
            onFocus:(e)=>{
            },
           ...toRefs(data),
           onChange(){
            //    console.log(data.editValue, 9966)
           }
            // onInput:(value)=>{
            //     data.editValue = value
            // }
        }
    },
})
</script>
<style scoped>
    .rich-text{
        width: 800px;
        margin:0 auto;
        height: 400px;
        margin-bottom: 100px;
    }
    #vue-editor{
       height: 150px;
   }
   .editor-contain{
       height: 100%;
   }
   :deep(#vue-editor)
</style>