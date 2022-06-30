import {
    provide,
    inject,
    reactive,
    ref,
    watch,
    watchEffect,
    onRenderTracked,
    onRenderTriggered,
    onUnmounted
} from 'vue'
export const useState = (default_v) =>{
    const state = ref(default_v)
    return [state, (v)=>{
        state.value = v
    }]
}
export const useEffect = (fn, array)=>{
    if(typeof array === undefined){
        onRenderTracked(()=>{
            fn()
        })
        onRenderTriggered(()=>{
            fn()
        })
    }else if(array instanceof Array){
        if(array.length === 0){
            watchEffect((...args)=>{
                fn(...args)
            })
        }else{
            let callback = ref(null)
            const fns = array.map((item)=>{
                if(item.value === undefined){
                    console.error('params must ref')
                }
                return ()=>item.value
            })
            watch(fns, ([...args])=>{
                // console.log(args)
                callback.value = fn(args)
            },
            {
                immediate:true
            })
            onUnmounted(()=>{
                // console.log('112233')
                callback.value && callback.value()
            })
        }
    }else{
        console.error(`${array} is not array,please check your code!`)
    }
}