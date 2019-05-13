var path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    mode: 'development', //模式，这里是开发模式，还有一种生产模式
    entry:'./src/main.js',//入口
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist') //路径必须是绝对路径
        // path.resolve(__dirname,'dist')可以把路径解析为绝对路径
    },//出口
    devServer:{
        open:true,
        port:8080,
        contentBase:'./dist',
        hot: true, //启用热更新第一步
        compress: true,
        historyApiFallback: true,
    },//开发服务器

    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},//用来处理css的第三代模块,处理顺序，从后向前
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},//用来处理less文件的第三方模块
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.(jpg|jpeg|png|gif|bmp)$/,use:'url-loader?limit=30000&name=[hash:8]-[name].[ext]'},//处理图片路径的loader
            // limit 给定的值，是图片的大小，单位是byte，如果我们引用的图片大于这个大小，则不会转为base64编码，如果小于这个大小，则会转为base64编码
            // name=[name].[ext]表示名字后缀不变,name=[hash:8]-[name].[ext]前面有8为哈希值
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//处理字体文件loader
            { test:/\.vue$/,use:'vue-loader' },
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},//配置babel来转化高级的ES语法
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
    ]
}