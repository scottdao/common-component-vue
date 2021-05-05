import { createApp } from 'vue'
import App from './App.vue'
import { installAntd } from '../../src/components/index.js'
// import router from './router'
// import store from './store'
import 'ant-design-vue/dist/antd.css'
// import { antUi } from './components/common/antd/antdUi'
// import { initIcon } from './components/common/antd/lazyIcons'
// import api from './libs/api'
// import config from './config/config'
// import { Modal } from 'ant-design-vue';
// import './assets/style/global.less';
const app = createApp(App);
installAntd(app);
//按需引入antd,如有添加，修改里面文件便好
// antUi(app);
// initIcon(app);
// app.config.globalProperties.$Modal = Modal;
// app.config.globalProperties.$http = api;
// app.config.globalProperties.$config = config;
app.mount('#app')