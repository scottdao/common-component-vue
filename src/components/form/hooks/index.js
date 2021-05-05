import { provide, inject, reactive, ref, toRefs } from 'vue'
import _ from 'lodash'
export const useFormSearch = ({ formParams, col = 3, formState, formConfig, formItemConfig }) => {
    const formRef = ref()
    const state = reactive({
        formParams: [],
        formState: formState,
        formConfig,
        formItemConfig,
        col
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
        formRef
    })
}
export const useFormParams = () => {
    return inject('formParams')
}