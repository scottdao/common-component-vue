<template>
    <a-form  
        ref="formRef" 
        :model="formState" 
        :rules='formConfig.rules'
        :hideRequiredMark='formConfig.hideRequiredMark'
        :labelAlign='formConfig.labelAlign'
        :scrollToFirstError='true'
    >
            <a-row :gutter="24" v-for="(items, index) in formParams" :key="index">
                <a-col 
                    v-for="(item, index) in items" 
                    :key="item.id"  
                    :span='item.span?item.span:(24/col)' 
                    :offset='item.offset||(items.length-1===index?(24-((24/col)*items.length)):0)'
                >
                    <a-form-item  
                            :name="item.filed"
                            :label="item.label"
                            :wrapper-col="{
                                span:item.label?20:24
                            }"
                            :label-col="{span:4, style:{
                                    // lineHeight:2
                                }
                                }"
                    >
                        <span v-if="!item.isSlotFlag">
                            <!-- input简易 -->
                            <a-input 
                                v-if="item.component.name === 'input'"
                                v-model:value="formState[item.filed]" 
                                :placeholder='item.component.props.placeholder'
                                :size='(item.component && item.component.props && item.component.props.size) || ""'
                                @change="(e)=>item.component.props.change && item.component.props.change(e)"
                                allowClear
                                style="height:100%;"
                            />
                            <!-- inputNumber简易 -->
                            <a-input-number 
                                v-if="item.component.name==='inputNumber'"
                                style="width:100%;height:100%;"   
                                v-model:value="formState[item.filed]" 
                                :placeholder='item.component.props.placeholder'
                                :size='(item.component && item.component.props && item.component.props.size) || ""'
                                @change="(e)=>item.component.props.change && item.component.props.change(e)"
                                allowClear
                            >
                             </a-input-number>
                            <!-- select简易 -->
                            <a-select 
                               v-if="item.component.name==='select'"
                               v-model:value="formState[item.filed]"
                               allowClear
                               :placeholder='item.component.props.placeholder'
                               style="height:100%;"
                                @change="(e)=>item.component.props.change && item.component.props.change(e)"
                               :size='(item.component && item.component.props && item.component.props.size)||""'
                               :mode="item.component.props.mode || undefined"
                            >
                                <a-select-option
                                    v-for="_option in item.component.data"
                                    :value='_option.value'
                                    :key="_option.id"
                                >{{_option.label}}</a-select-option>
                            </a-select>
                            <!-- a-date-picker简易 -->
                            <a-date-picker
                                v-if="item.component.name==='datePicker'"
                                v-model:value="formState[item.filed]"
                                allowClear
                                :locale='locale'
                                style="width:100%;"
                                :size='(item.component && item.component.props && item.component.props.size)||""'
                                :placeholder='item.component.props.placeholder'
                                @change="(e)=>item.component.props.change&&item.component.props.change(e)" 
                                @ok="(e)=>item.component.props.ok&&item.component.props.ok(e)"
                                :show-time="item.component.props.showTime"
                            />
                            <!-- <component
                                :is="item.component.name"
                                :placeholder='item.component.props.placeholder'
                                :ref='item.filed'
                                v-model:value="formState[item.filed]"
                            /> -->
                        </span>
                         <span v-else-if="item.isSlotFlag===1" >
                             <!-- 具名插槽与作用域插槽 -->
                             <slot :name="item.filed" :config='item' ></slot>
                         </span>
                         <span v-else>
                             <!-- 纯作用域插槽 -->
                             <slot :data='item'> </slot>
                         </span>
                    </a-form-item>
                </a-col>
            </a-row>
    </a-form>
</template>
<script lang="js">
import { defineComponent, onMounted } from 'vue';
import _ from 'lodash';
 import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
export default defineComponent({
    name:'commonForm',
    props:{
        formParams:{
            type:Object,
            default:()=>{}
        }
    },
    setup(props) {
        return {
          ...props.formParams,
          sizeConfigs:{
              small:28,
              default:32,
              large:40
          },
          locale
        }
    },
})
</script>
<style lang="css" scoped>
    /* /deep/ .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
        height: 100%;
    } */
</style>
