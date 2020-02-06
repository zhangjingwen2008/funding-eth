
let Web3=require('web3')
// let web3=new Web3(window.web3.currentProvider)
let web3Provider=window.ethereum
window.ethereum.enable()                //激活metamask进行授权后，才可获得地址
let web3=new Web3(web3Provider)

/* 新版的方式 */
// var web3Provider;
// if (window.ethereum) {
//     console.log('window.ethereum')
//     web3Provider = window.ethereum;
//     try {
//         // 请求用户授权
//         await window.ethereum.enable();
//     } catch (error) {
//         // 用户不授权时
//         console.error("User denied account access")
//     }
// } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
//     web3Provider = window.web3.currentProvider;
// } else {
//     web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
// }
// var web3js = new Web3(web3Provider);//web3js就是你需要的web3实例
// web3js.eth.getAccounts(function (error, result) {
//     if (!error)
//         console.log(result)//授权成功后result能正常获取到账号了
// });
//export导出，es6语法，default标志默认导出，在使用时，名字可以改变
//使用时，使用import
export default web3;