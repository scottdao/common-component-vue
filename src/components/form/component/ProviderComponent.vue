<template>
    <a-config-provider :locale="locale === 'en' ? enUS : zhCN" >
        <!-- input简易 -->
        <a-input 
            v-if="name === 'input'"
            :value='value'
            @input="$emit('update:value', $event.target.value)"
            :placeholder='props.placeholder'
            :size='(props && props.size) || ""'
            @change="(e)=>props.change && props.change(e)"
            allowClear
            style="height:100%;"
        />
        <!-- inputNumber简易 -->
        <a-input-number 
            v-if="name==='inputNumber'"
            style="width:100%;height:100%;"   
            :value='value'
            @input="$emit('update:value', $event.target.value)"
            :placeholder='props.placeholder'
            :size='(props && props.size) || ""'
            @change="(e)=>props.change && props.change(e)"
            allowClear
        >
        </a-input-number>
        <!-- select简易 -->
        <a-select 
            v-if="name==='select'"
            :value='value'
            allowClear
            :placeholder='props.placeholder'
            style="height:100%;"
            @change="(e)=>{ 
                $emit('update:value', e)
                props.change && props.change(e) 
            }"
            :size='(props && props.size)||""'
            :mode="props.mode || undefined"
        >
            <a-select-option
                v-for="_option in data"
                :value='_option.value'
                :key="_option.id"
            >{{_option.label}}</a-select-option>
        </a-select>
        <!-- a-date-picker简易 -->
        <a-date-picker
            v-if="name==='datePicker'"
            :value='value'
            allowClear
            style="width:100%;"
            :size='(props && props.size)||""'
            :placeholder='props.placeholder'
            @change="(e)=>{
                $emit('update:value', e)
                props.change&&props.change(e) 
            }"
            @ok="(e)=>props.ok&&props.ok(e)"
            :show-time="props.showTime"
            :format='props.format||"YYYY-MM-DD"'
            :disabledTime="props.disabledTime||(()=>{})"
        />
        <!-- a-range-picker简易 -->
        <a-range-picker
            v-if="name==='rangePicker'"
            :value='value'
            allowClear
            style="width:100%;"
            :size="(props && props.size)||''"
            :placeholder='props.placeholder'
            @change="(e)=> {
                $emit('update:value', e)
                props.change&&props.change(e)
            }"
            @ok="(e)=>props.ok&&props.ok(e)"
            :show-time="props.showTime || false"
            :format='props.format||"YYYY-MM-DD"'
            :disabledTime="props.disabledTime||(()=>{})"
        />
    </a-config-provider>
</template>
<script>
import { defineComponent, onMounted, toRefs, reactive } from 'vue';
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default defineComponent({
     props:{
        components:{
            type:Object,
            default:()=>{}
        },
        locale:{
            type:String,
            default:'ch'
        },
        value:{
        }
    },
    setup(props, context) {
        // console.log(context, 887666)
        const state = reactive({
            data:[]
        })
        onMounted(async ()=>{
           const _data = props.components.data
           if(_data instanceof Array){
               state.data = _data
           }else if(_data instanceof Function){
                const _data_ = await _data()
                state.data = _data_
           }
        })
        return {
            ...props.components,
            ...toRefs(state),
            enUS,
            zhCN,
            // console
        }
    }
})
</script>
<style scoped>

</style>
