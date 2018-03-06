<template>
    <div class="admin">
         <el-container>
   <!-- 公共头部 -->
  <el-header>
       <span>欢迎您,{{uname}}</span>|
      <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
      下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="a">退出登录</el-dropdown-item>
    <el-dropdown-item command="b">修改密码</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
  </el-header>
  <el-container>
         <!-- 公共左侧 -->
    <el-aside width="200px">
      <!-- 挂载组件 -->
    <appaside></appaside>

    </el-aside>
    <el-main>
           <!-- 变化的管理子页面 -->
           <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
    </div>
 </template>

<script>
import Header from '../subcom/Header.vue'
import Aside from '../subcom/Aside.vue'
    export default {
        data(){
            return{
                uname:localStorage.getItem('uname')
            }
        },
        // 注册子组件
        components:{
            appheader:Header,
            appaside:Aside
        },
         methods: {
             logout(){
            this.$http.get(this.$api.logout).then((res)=>{
                    if(res.data.status==0){
                        this.$router.push({name:'login'})
                    }
            })
             },
        handleCommand(command) {
        if(command=="a"){
            this.logout();
        }
      }
      
    }
    }
</script>

<style scoped>
 .el-header{
    background-color:white;
    color: #333;
    line-height: 60px;
    text-align: right;
}
  
   .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
     
  }
  .el-aside {
    background-color:#545c64;
    color: #333;
    text-align: center;
    height: 100%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
}
</style>