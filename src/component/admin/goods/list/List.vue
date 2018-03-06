<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">购物商场</el-breadcrumb-item>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
 <!-- 图标组件 -->
 <div class="father">
        <el-button type="success" plain size="mini" icon="el-icon-plus">新增</el-button>
        <el-button type="success" @click="all" plain size="mini" icon="el-icon-success">全选</el-button>
        <el-button type="success" @click="del" plain size="mini" icon="el-icon-delete">删除</el-button>
<!-- 输入框 -->
    <div class="demo-input-suffix">
        <el-input size="mini"
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        v-model="apiQuery.searchvalue" @blur="searche">
        </el-input>
    </div>
   </div>
 <!-- 表格 -->
    <!-- data属性用来配置表格数据 -->
    <el-table ref="multipleTable" @selection-change="change" :data="tableData3" style="width: 100%">
        <!-- 多选框 -->
    <el-table-column type="selection"  width="55"></el-table-column>
    <!-- label列的表头 -->
    <el-table-column label="标题" >

      <template slot-scope="scope">
          <!-- 图片预览 -->
        <el-tooltip class="item" effect="dark" content="商品展示" placement="right">
          <router-link style="color:blue" :to="{name:'goodsDetail'}">{{scope.row.title}} </router-link>
          <div slot="content">
              <img style="width:200px" :src="scope.row.imgurl" alt="商品图片">
          </div>
        </el-tooltip>  

        </template>
    </el-table-column>
<!-- 当前列要展示的那个字段的值 -->
    <el-table-column prop="categoryname" label="所属类别" width="120"></el-table-column>
<!-- 当前列要展示的那个字段的值 -->
    <el-table-column prop="stock_quantity" label="库存" width="120" show-overflow-tooltip></el-table-column>
    <el-table-column prop="market_price" label="市场价" width="120"></el-table-column>
    <el-table-column prop="sell_price" label="销售价" width="120"></el-table-column>
    <el-table-column prop="name" label="属性" width="120">
        <template slot-scope="scope">
            <!-- 轮播图 -->
            <el-tooltip class="item" effect="dark" content="轮播" placement="bottom">
            <span :class="[`el-icon-picture`, scope.row.is_slide==1? `active`:``]"></span>
            </el-tooltip>
            
            <!-- 推荐 -->
            <el-tooltip class="item" effect="dark" content="推荐" placement="bottom">
            <span  :class="['el-icon-star-off', scope.row.is_hot == 1? 'active': '']"></span>
             </el-tooltip>
            <!-- 置顶 -->
            <el-tooltip class="item" effect="dark" content="置顶" placement="bottom">
            <span :class="[`el-icon-upload`,scope.row.is_top==1?`active`:``]"></span>
            </el-tooltip>
        </template>
    </el-table-column>
    <el-table-column label="操作" width="120">
       <template slot-scope="scope">
            <router-link style="color:gray" :to="{path:`/admin/goods/detail/${scope.row.id}`}">修改</router-link>
       </template>
    </el-table-column>
</el-table>
<!-- 分页 -->
<!-- total用来设定数据总数，current-page设定当前页，page-size用来设定每页数量 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="apiQuery.pageIndex"
      :page-sizes="[2, 4, 6, 8,10]"
      :page-size="apiQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="apiQuery.total">
    </el-pagination>
 
    </div>
</template>

<script>
    export default {
        data() {
      return {
        //   表格数据
        tableData3: [],
        multipleSelection: [],
        // 搜索
        apiQuery:{
            pageIndex:1,
            pageSize:10,
            searchvalue:'',
            total:0
        },
        // 被选中的商品数据
        selectedGoodsList:[],
      }
    },
    methods:{
        // 定义一或者个商品列表数据的函数
        getGoodsDate(){
            // 先声明一个拼接好的字符串
            let api=`${this.$api.gsList}?pageIndex=${this.apiQuery.pageIndex}&pageSize=${this.apiQuery.pageSize}&searchvalue=${this.apiQuery.searchvalue}`

            this.$http.get(api).then((res)=>{
                // console.log(res)
                if(res.data.status==0){
                    this.tableData3=res.data.message;
                    // 将后端数据的数据总量赋予给分页组件
                    this.apiQuery.total=res.data.totalcount;
                }
            })
        },
        // 搜索
        searche(){
            this.getGoodsDate();
        },
        // 多选框改变触发的函数
        change(selection){
            this.selectedGoodsList=selection;
            console.log(this.selectedGoodsList)
        },
        // 删除
        del(){
            // console.log("执行删除函数")
            // 遍历要删除的ID数组
            let delID=this.selectedGoodsList.map(v=>v.id);
            if(delID.length==0){
                this.$alert("您还没有选中数据")
            }else{
            this.$http.get(this.$api.gsDel+delID).then(res=>{
                if(res.data.status==0){
                    // 执行获取数据，刷新页面
                    this.getGoodsDate();
                }
            })
            }
           

        },
        // 全选
        all(){
            // console.log("全选")
            document.querySelector('.el-checkbox__inner').click();
        },
        // 分页相关函数
         handleSizeChange(size) {
            //  将分页组件选取到的分页值发送到后台，然后重新获取数据
      this.apiQuery.pageSize=size;
      this.getGoodsDate();
      },
      // 分页相关函数
      handleCurrentChange(page) {
      this.apiQuery.pageIndex=page;
      this.getGoodsDate()
      }
    },
    // 页面加载就执行
    created(){
        this.getGoodsDate()
    }
    }
</script>

<style scoped>
 .father{
     margin-top:20px;
     margin-bottom: 20px;
 }
.demo-input-suffix{
    width: 200px;
    float: right;;
}
.active{
    color: red;
}
</style>