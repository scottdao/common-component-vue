import { provide, inject, reactive, ref, toRefs, watchEffect, watch } from 'vue'
import _ from 'lodash'
export * from './base'
/***
 *
 *搜索form表单参数逻辑
 *
 * ***/
export const useFormSearch = ({ formParams, col = 3, formState, formConfig, formItemConfig }) => {
    const formRef = ref()
    const state = reactive({
        formParams: [],
        formState: formState,
        formConfig,
        formItemConfig,
        col,
    })
    const _target = reactive({
        isFlagLimit: formParams.length < 3 ? false : true
    })
    const v = { filed: 'button', isSlotFlag: 1, id: 'btn' }
    const expandFn = () => {
        state.formParams = _.chunk([...formParams, v], col)
    }
    const noExpandFn = () => {
        state.formParams = _.chunk([...formParams.slice(0, 2), v], col)
    }
    provide('formParams', {
        ...toRefs(state),
        noExpandFn,
        expandFn,
        formRef,
        ..._target
        // isFlagLimit
    })
}
export const useFormParams = () => {
    return inject('formParams')
}

/**
 * 校验form表单参数逻辑设置
 * **/
export const useForm = () => {
    return inject('form')
}

export const setUseForm = ({ formParams, col = 1, formState, formConfig, formItemConfig }) => {
    const formRef = ref()
    // const [rules, setRules] = useState(formConfig.rules)
    const rules = ref(formConfig.rules)
    const setRules = (value)=>{
        rules.value = value;
    }
    const state = reactive({
        formParams: _.chunk([...formParams], col),
        formState: formState,
        formConfig:{...formConfig , rules },
        formItemConfig,
        col,
        // value,
        // setValue
    })
    provide('form', {...toRefs(state), formRef })
    return {
        setRules,
        rules:rules.value
    }
}