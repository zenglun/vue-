<template>
    <div>
   <el-col >
    <el-menu
   class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- 预留一个一级菜单, 将来通过v-for动态生成多组一级菜单 -->
           <!-- 这里的index用来给当前菜单起个名字, 以区分 -->
      <el-submenu v-for="item in menu" :key="item.title" :index="item.title">
        <!-- 菜单 -->
        <template slot="title">
            <i class="el-icon-message"></i>
          <span>{{item.title}}</span>
        </template>
        <!-- 子菜单 -->
        <el-menu-item-group>
          <template slot="title"></template>

          <el-menu-item index="subitem.title" v-for="subitem in item.chidren" :key="subitem.title">

            <router-link :to="subitem.path">{{subitem.title}}</router-link>

          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
   
      
  
    </el-menu>
  </el-col>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          menu:[
            {
              title:'商品管理',
              chidren:[
                {title:'商品列表',path:'/admin/goods/list'},
                // 商品详情传入ID暂定为1
               {title:'商品详情',path:'/admin/goods/detail/1'},
                {title:'评论管理',path:'/admin/goods/comment'}
              ]
            },
            {
              title:'订单管理',
              chidren:[
                {title:'内容',path:'/admin/1'},
               {title:'真的',path:'/admin/2'},
                {title:'假的',path:'/admin/3'}
              ]
            },
          ]
        }
      }
    }
</script>

<style scoped>

</style>