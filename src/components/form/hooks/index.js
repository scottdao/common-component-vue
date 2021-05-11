import { provide, inject, reactive, ref, toRefs, onMounted } from 'vue'
import _ from 'lodash'
export const useFormSearch = ({ formParams, col = 3, formState, formConfig, formItemConfig }) => {
    const formRef = ref()
        // const isFlagLimit = ref(formParams.length < 3 ? false : true)
    const state = reactive({
        formParams: [],
        formState: formState,
        formConfig,
        formItemConfig,
        col,
        // isFlagLimit: formParams.length < 3 ? false : true
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