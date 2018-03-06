<template>
    <div>
 <div class="detail">
<!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/admin' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/goodsList' }">商品列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 表单 -->
        <el-form ref="form" :model="form" label-width="80px" label-position="left" class="detail_form">
        <el-form-item label="内容标题">
        <el-input v-model="form.title" label-width="80px"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
        <el-input v-model="form.sub_title" label-width="80px"></el-input>
        </el-form-item>
        
        <el-form-item label="所属类别">
        <el-select v-model="form.category_id" placeholder="请选择">

      <el-option v-for="item in category" :key="item.title" :label="item.title" value="item.title">
          <span>
            <span v-if="item.class_layer !=1">-</span>
            <span>{{item.title}}</span>
          </span>
      </el-option>
      </el-select>
  </el-form-item>
 
  <el-form-item label="是否发布">
    <el-switch v-model="form.status" class="el"></el-switch>
  </el-form-item>

  <el-form-item label="推荐类型">
    <el-switch v-model="form.is_slide" class="ele" active-text="轮播图"></el-switch>
    <el-switch v-model="form.is_top" class="ele" active-text="置顶"></el-switch>
    <el-switch v-model="form.is_hot" class="ele" active-text="推荐"></el-switch>
  </el-form-item>

  <el-form-item label="上传封面">
    <el-input v-model="form.a">form.imgList</el-input>
    <el-upload
  class="upload-demo"
  action="http://localhost:8899/admin/article/uploadfile"
  :file-list="form.imgList"
  :on-success="uploadImg"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
  </el-form-item>

  <el-form-item label="上传附件">
    <el-input v-model="form.b">form.fileList</el-input>
    <el-upload
  class="upload-demo"
  action="http://localhost:8899/admin/article/uploadfile"
  :file-list="form.fileList"
  :on-success="uploadFile">
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
  </el-form-item>

  <el-form-item label="商品货号">
    <el-input v-model="form.goods_no"></el-input>
  </el-form-item>

   <el-form-item label="库存数量">
    <el-input v-model="form.stock_quantity"></el-input>
  </el-form-item>

    <el-form-item label="市场价格">
    <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
    <el-input v-model="form.sell_price"></el-input>
    </el-form-item>

     <el-form-item label="内容摘要">
    <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>

     <el-form-item label="详细内容">
    <!-- <el-input v-html="form.content"></el-input>
     -->
     <quillEditor v-model="form.content"></quillEditor>
    </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">保存</el-button>

    <el-button @click="$router.go(-1)">返回上一页</el-button>
  </el-form-item>
</el-form>
 </div>
    </div>
</template>

<script>
// 引入第三方文件
import'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {quillEditor} from'vue-quill-editor'
    export default {
        data() {
            return {
              // 表单数据
              form: {},
              // 分类列表数据
              category:[],
              // 通过id获取商品数据
              id:this.$route.params.id
            }
    },
    methods: {
        getGoods(){
          this.$http.get(this.$api.gsDetail+this.id).then(res=>{
            
            if(res.data.status==0){
              this.form=res.data.message;
              // 数据转换
              this.form.category_id=+this.form.category_id;
              // console.log(1)
            }
   })
 },
//  获取商品数据分类
  getCategory(){
    this.$http.get(this.$api.ctList+"goods").then(res=>{
   if (res.data.status==0) {
       this.category=res.data.message
   }
    })
  },
  // 上传封面
  uploadImg(data){
    this.form.imgList=[data];
  },
  // 上传附件
  uploadFile(data){
this.form.fileList.push(data)
  },
  
   // 保存按钮
    onSubmit(){
        // console.log(1)
        this.$http.post(this.$api.gsEdit+this.id,this.form).then(res=>{
          if(res.data.status==0){
            this.$alert('数据修改成功')
          }
        })
    }

    },
    created(){
      this.getGoods();
      this.getCategory();
  
    },
    // 注册富文本组件
    components:{
        quillEditor
    }
    }
</script>

<style scoped lang="less">
.detail{
  &_form{
    margin-top: 30px;
    width: 600px;
   .el{
         margin-top: 10px;
    }
     .ele{
         margin-right:10px;
    }
   
  }
}

</style>