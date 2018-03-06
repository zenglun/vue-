import Vue from 'vue';
import App from './component/App.vue';
import router from './router';
// 第三方插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
require("./less/index.css")
// 第三方样式文件
// 引入全局样式文件用于登录
import 'normalize.css';
// 接口文件，为了全局使用，将其加到原型中最好
import axios from 'axios';
import api,{domain} from './js/api_config';
// 设置默认域名
axios.defaults.baseURL = domain;
// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials = true;
// 添加原型
Vue.prototype.$http=axios;
Vue.prototype.$api=api

// 启用插件
Vue.use(ElementUI);
// axios.get(domain+api.logout).then(()=>console.log("登出"))

new Vue({
    el:"#app",
    router: router,
    render:ct=>ct(App),

   
})