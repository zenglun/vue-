<template>
    <div class="login">
        <section>
            <el-form :model="ruleForm2" label-position="top" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户" prop="uname">
             
            <el-input type="text" v-model="ruleForm2.uname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="upwd">
                
            <el-input type="password" v-model="ruleForm2.upwd" auto-complete="off"></el-input>
            </el-form-item>
 
            <el-form-item style=" text-align: center">
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
export default {
  data() {
    // 按照接口文档填写数据
    return {
      ruleForm2: {
        uname: "",
        upwd: ""
      },
      // 校验规则  required：true 表示此项必填。
      rules2: {
        uname: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        upwd: [{ required: true, message: "请输入用密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      // 用post发送请求
      this.$http.post(this.$api.login, this.ruleForm2).then((res) => {
        // console.log(res);第一个参数是文本内容，第二个是标题。第三个配置对象
        if(res.data.status==0){
            this.$alert("登录成功","提示",{
                callback:()=>{
                    //保存用户名
                    localStorage.setItem('uname',res.data.message.uname)

                    let nextPage=this.$route.query.next||'/admin';
                      // 登录之后跳转到用户之前要访问的页面
                    this.$router.push({path:nextPage})

                 
                }
            })
        }else{
            this.$alert(res.data.message)
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         this.login()
        } else {
          console.log("登录失败");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style scoped lang="less">
.login {
  height: 100%;
  section {
    width: 400px;
    height: 300px;
    margin: 0 auto;
    padding: 10px 20px;
    border: 3px solid #000;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 5px;
   
  }
}
</style>