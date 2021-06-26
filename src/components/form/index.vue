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
                            <provider-component 
                                :components='item.component||{}' 
                                :locale="formConfig.locale"
                                v-model:value='formState[item.filed]'
                            ></provider-component>
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
import ProviderComponent from './component/ProviderComponent'
export default defineComponent({
    name:'commonForm',
    components:{
        ProviderComponent
    },
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
          }
        }
    },
})
</script>
<style lang="css" scoped>
    /* /deep/ .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
        height: 100%;
    } */
</style>
