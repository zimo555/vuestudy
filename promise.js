const fs = require('fs')
// 1.promise 是一个构造函数，那么，可以 new Promise()得到一个Promise实例
// 2.在Promise上，有两个函数，分别叫做 resolve(成功之后的回调函数)和 reject
// (失败之后的回调函数)
// 3.在 Promise 构造函数的 Prototype 属性上，有一个 .then()方法，也就是说，只要是
// Promise 构造函数创建的实例，都可以访问到 .then() 方法
// 4. 如果 Promise 表示一个异步操作，每当我们new Promise() 一个实例
// 这个实例就表示一个具体的异步操作
// 5. 既然Promise 创建的实例是一个异步操作，那么这个异步操作的
// 结果就只有两种状态
// 5.1状态一：异步执行成功了，需要在内部调用 resolve函数把结果返回给调用者
// 5.2状态二：异步执行失败了，需要在内部调用 reject函数把结果返回给调用者
// 5.3由于Promise 的实例，是一个异步操作，所以，内部拿到操作的结果后，无法使用
// return 把操作的结果返回给调用者；这时候，只能使用回调函数的形式，来把成功或
// 失败的结果返回给调用者
// 6.我们可以在new 出来的Promise实例上，调用.then()方法，预先为这个 Promise 
// 异步操作指定成功（resolve）和失败(reject)的回调函数


// 注意：这里new 出来的 promise，只是代表【形式上】的异步操作
// 形式上的异步操作：就是说只知道它是一个异步操作，但具体所做的异步事情不清除
//var promsise = new Promise();

// 这是一个具体的异步操作，使用function指定具体的异步操作
// var promise = new Promise(function(){
//     // 这个 function 内部写的就是具体的异步操作
// })



//每当 new 一个 Promise 实例的时候，就会立刻执行 function 中的异步操作
// 如果不想立即执行，可以用function 把 promise包裹起来

// var promise = new Promise(function(){
//     fs.readFile('./files/2.txt','utf-8',(err,data)=>{
//         if(err) throw err
//         console.log(data)
//     })
// })


// function getFileByPath(fpath){
//     var promise = new Promise(function(){
//         fs.readFile(fpath,'utf-8',(err,data)=>{
//             if(err) throw err
//             console.log(data)
//         })
//     })
// }

// getFileByPath('./files/2.txt')


// 给路径返回读取到的内容


function getFileByPath(fpath){
    var promise = new Promise(function(resolve,reject){
        fs.readFile(fpath,'utf-8',(err,data)=>{
            if(err) return reject(err)
            resolve(data)
        })
    })
    return promise
}

// var p = getFileByPath('./files/1.txt') 
// // 注意：拿到p 之后读取文件并没执行，此时p.then()定义resolve,reject
// // 之后再读取文件
// p.then(function(data){
//     console.log(data+'------');
// },function(err){
//     console.log(err.message)
// })


// 此读取文件1，再读取文件2，最后读取文件3
// 注意：通过.then指定 回调函数的时候，成功的回调函数必须传。
// 失败的回调函数可以省略
// 但是不要用下面方法
// getFileByPath('./files/1.txt').then(function(data){
//     console.log(data);
//     getFileByPath('./files/2.txt').then(function(data){
//         console.log(data);
//         getFileByPath('./files/3.txt').then(function(data){
//             console.log(data)
//         })
//     })
// })

// 正确的使用Promise方式
// 读取文件1
// 在上一个 .then 中，返回一个新的 promise 实例，可以继续用下一个 .then来处理
// 如果，前面的 promise 执行失败，我们不想让后续的promise 操作被终止
// 可以为每个 promise 指定失败的回调

// getFileByPath('./files/21.txt')
// .then(function(data){
//     console.log(data);
//     return getFileByPath('./files/2.txt')
// },function(err){
//     console.log(err.message)
//     // return 一个新的 promise
//     return getFileByPath('./files/2.txt')
// })
// .then(function(data){
//     console.log(data);
//     return getFileByPath('./files/3.txt')
// },function(err){
//     console.log(err.message)
//     // return 一个新的 promise
//     return getFileByPath('./files/3.txt')
// })
// .then(function(data){
//     console.log(data);
// })

// console.log('bdsvi');



getFileByPath('./files/1.txt')
.then(function(data){
    console.log(data);
    return getFileByPath('./files/34.txt')
})
.then(function(data){
    console.log(data);
    return getFileByPath('./files/3.txt')
})
.then(function(data){
    console.log(data);
})
.catch(function(err){
    // catch 作用：如果前面有任何 Promise 执行失败，则立即终止
    // 所有的 promise　的执行，并马上进入　catch去处理
    console.log(err.message)
})

console.log('bdsvi');
// 结果：111 bdsvi 错误信息