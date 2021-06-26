import { provide, inject, reactive, ref, toRefs } from 'vue'
export const useState = (default_v) =>{
    const state = ref(default_v)
    return [state.value, (v)=>{
        state.value = v
    }]
}