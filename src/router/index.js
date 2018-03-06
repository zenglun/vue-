//引入vue-router路由插件 
import Vue from 'vue'
import Router, { VueRouter } from 'vue-router'
// 路由入口和配置
// 登录页面
import Login from '../component/login/Login.vue'
// 注册页面
import Register from '../component/register/Register.vue'
// 后台管理
import Admin from '../component/admin/Admin.vue'
// 商品管理路由模块
import GoodsList from '../component/admin/goods/list/List.vue'
import GoodsDetail from '../component/admin/goods/detail/Detail.vue'
import GoodsComment from '../component/admin/goods/comment/Comment.vue'

// 表示使用路由插件
Vue.use(Router)
// 商品管理模块相关页面
const goods=[
    {name:"goodsList",path:"goods/list",component:GoodsList},
    { name: "goodsDetail", path: "goods/detail/:id", component: GoodsDetail }, { name: "goodsComment", path: "goods/comment", component: GoodsComment },
]
// 配置路由规则,导出路由规则
var router=new Router({
    routes: [
        // 登录
        {name:"login",path:"/login",component:Login},
        // 后台管理
        { name: "admin", path: "/admin", component: Admin, children: [...goods]},
        // 注册页面
        {name:"register",path:"/register",component:Register}
    ]
})

// 添加路由前置守卫，就是一个函数，这个函数会在路由配置之前执行，我们可以在这添加一些登录权限验证，to和from是两个对象，可以拿到url信息
router.beforeEach((to,from,next)=>{
    // 通过to。name得知用户要访问什么页面，如果是admin相关页面，就判断其有没有登录
// 如果登录过就通过访问，没有就跳转到登录页面
 Vue.prototype.$http.get(Vue.prototype.$api.islogin).then(res=>{
     let isLogin=false;
  
     if (res.data.code =="logined"){
         isLogin=true;
     }

    if(to.name=='login'){
        if(isLogin){
            next({name:'admin'})
        }else{
            next()
        }
    } 
    if(to.name!='login'){
        if(isLogin){
            next();
        }else{
            // query用来设置url中的查询字符串，我们这里把用户访问的页面地址通过query记录下来
            // 将来用户登录成功之后，在跳转到这个地址
            next({ name: 'login',query:{next:to.fullPath}}) 
        }
    }

 })
})

// 
export default router;
