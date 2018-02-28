var path=require("path")
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports={
    //入口文件配置
    entry:"./src/main.js",
    // 出口文件配置项
    output:{
        // 输出的路径，webpack规定必须是绝对路径
        path:path.join(__dirname,'dist'),
        // publicPath:"/dist",
        // 输出文件名字
        filename:"bundle.js"
    },
    // 解析文件种类配置
    module:{
        rules:[
            // 配置用来解析css文件的loader
            {
                // 1.0 用正则匹配当前访问的文件的后缀名是  .css
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //webpack底层调用这些包的顺序是从右到左
            },
            // 解析less用的
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            // 解析图片字体用的
            {
                test: /\.(png|jpg|gif|svg|woff|ttf)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50000
                        // 根据图片大小来选取不用的处理方式
                    }
                }]
            },
            // 配置解析vue.webpack
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 解析ES6等新语法
            {
                test: /\.js$/,
                exclude:/node_modules/, 
                // 排除该文件夹，提高打包效率
                loader: 'babel-loader'
            }
           
        ]
    },
    // 用于解析html
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            title:"买买买"
        })
    ] 
}