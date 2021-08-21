import { 
    defineComponent,
    onMounted,
    watchEffect,
    reactive,
    watch,
    ref,
    onBeforeUnmount
} from 'vue'
import Quill from 'quill';
import katex from 'katex';
import 'katex/dist/katex.css';
import 'quill/dist/quill.snow.css'; // 主题样式
import 'quill/dist/quill.bubble.css'; // 主题样式
import BetterTable from 'quill-better-table'
import 'quill-better-table/dist/quill-better-table.css'
const win = window;
win.katex = katex;
import get from 'lodash/get'
import set from 'lodash/set'
import isEmpty from 'lodash/isEmpty'
import { source } from 'vfile-message';

// 注册table组件
Quill.register({
    'modules/better-table': BetterTable
  }, true)

export default defineComponent({
    emits: ['onFocus', 'onBlur', 'onChange', 'input', 'onReady'],
    props:{
        options:{
            type:Object,
            default:{}
        },
        // 表格参数行列
        insertTable:{
            type:Array,
            default:[3, 3]
        },
        // 内容值
        content:String
    },
    setup(props , context){
        const { options, insertTable } = props
        const { slots, emit, attrs } = context
        const editRef = ref(null)
        const vueEditRef = ref(null)
        const data = reactive({
            _content:'',
        })
        const tableParams = {
               table: false,
              'better-table': {
                operationMenu: { // table右键事件重命名
                    items: {
                        insertColumnRight: {
                        text: '右侧插入一列'
                        },
                        insertColumnLeft: {
                        text: '左侧插入一列'
                        },
                        insertRowUp: {
                        text: '上侧插入一行'
                        },
                        insertRowDown: {
                        text: '下侧插入一行'
                        },
                        mergeCells: {
                        text: '合并单元格'
                        },
                        unmergeCells: {
                        text: '拆分单元格'
                        },
                        deleteColumn: {
                            text: '删除当前列'
                        },
                        deleteRow: {
                            text: '删除当前行'
                        },
                        deleteTable: {
                            text: '删除表格'
                        }
                    },
                    color: {
                        colors: [
                          '#E53333', '#E56600', '#FF9900', '#64451D',
                          '#DFC5A4', '#FFE500', '#009900', '#006600',
                          '#99BB00', '#B8D100', '#60D978', '#00D5FF',
                          '#337FE5', '#003399', '#4C33E5', '#9933E5',
                          '#CC33E5', '#EE33EE', '#FFFFFF', '#CCCCCC',
                          '#999999', '#666666', '#333333', '#000000'
                        ],
                        text: '背景颜色'
                    }
                },
                keyboard: {
                    bindings: BetterTable.keyboardBindings //绑定table右键事件
                },
              }
        }
        const handlers = {
            quill: undefined,
            table() { // 工具栏点击事件修改
                const quill = this.quill
                const tableModule = quill.getModule('better-table')

                tableModule.insertTable(...insertTable)
            }
        }
        const container = [
            [{'header': [1, 2, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'script': 'sub'}, {'script': 'super'}],
            [{'align': []}],
            [{'color': []}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'direction': 'rtl'}],
            ["formula"], // 函数功能
            ['link', 'image', 'video'],
            ['table'], // 引入table到工具栏
            ['clean'],
        ]
        const defaultOptions = {
            theme: 'snow', // 设置主题
            modules: {
              toolbar: {
                container: container,
                handlers: handlers,
              },
              ...tableParams
            }
        }
        const optionsRef = ref(null)
        onMounted(()=>{
            optionsRef.value ={
                ...defaultOptions,
            }
            if(!isEmpty(options)){
                optionsRef.value = {
                    ...defaultOptions,
                    ...options,
                    modules:{
                        ...options.modules,
                        ...tableParams
                    }
                }
            }
            if(isEmpty(get(options, 'modules.toolbar.container', ''))){
                set(optionsRef.value, 'modules.toolbar.container', container)
            }
            if(isEmpty(get(options, 'modules.toolbar.handlers'))){
                set(optionsRef.value, 'modules.toolbar.handlers', handlers)
            }
            editRef.value = new Quill('#vue-editor', optionsRef.value)
            editRef.value.on('selection-change', range=>{
                if(range){
                    emit('onFocus', editRef.value)
                }else{
                    emit('onBlur', editRef.value)
                }
            })
            editRef.value.on('text-change', (...args)=>{
                let Html = vueEditRef.value.children[0].innerHTML;
                const quill = editRef.value
                const text = editRef.value.getText()
                if(Html === '<p><br></p>'){
                    Html = ''
                }
                // console.log(attrs)
                attrs['onUpdate:value'] && attrs['onUpdate:value'](Html)
                data._content = Html
                emit('onChange', { html: Html, text, quill })
            })
            emit('onReady', editRef.value)

            handleEffect(attrs.value || props.content)
        })
        const handleEffect = (value)=>{
            if(editRef.value){
                if(value && value !== data._content){
                    data._content = value
                    vueEditRef.value.children[0].innerHTML = value
                }
                else if(!value){
                    vueEditRef.value.children[0].innerHTML = ''
                }
            }
        }
        watch([()=>props.content], ([value])=>{
            if(attrs.value){
                return false
            }
            handleEffect(value)
        },
        {
            deep:true,
            immediate:true
        })
        onBeforeUnmount(()=>{
            editRef.value = null;
        })
        return ()=><div className='editor-contain'>
                    <div id="toolbar">
                        {/* 通过具名插槽--自定义工具 */}
                        {slots.toolbarCustomer && slots.toolbarCustomer()}
                    </div>
                    <div id="vue-editor" ref={vueEditRef} ></div>
                </div>
    }
})