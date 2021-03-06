
# 功能介绍

### 一、发起众筹

   在“我发起的”标签页中，发起众筹功能的可选输入项：
   
   - 项目名称 
   - 支持金额（以wei为单位，遵循1 ether = 1\*10**18 wei的换算规律） 
   - 目标金额（同上）
   - 众筹时间（以秒为单位）
   
   点击“创建众筹”后即调用浏览器的MetaMask，就会与区块链进行交互来创建一个交易
   
   创建成功后的众筹就会显示在“所有的”标签页中

### 二、发起付款请求
    
   在“我发起的”标签页中，点击一个众筹，其项目信息就会出现在下方“发起付款请求”表单中。
   
   发起付款请求功能的可选输入项：
   
   - 请求描述
   - 付款金额（以wei为单位）
   - 商家收款地址（最终收款方的钱包地址）
    
   点击“发起付款请求”后即调用浏览器的MetaMask，就会与区块链进行交互来创建一个交易

### 三、参与众筹

   在“所有的”标签页中，点击一个众筹，其项目信息就会出现在下方“参与众筹”表单中。
   
   由于详细信息已自动填充，直接点击“参与众筹”按钮即可调用MetaMask来完成参与操作。
   
   当前用户参与过的众筹，会在“我参与的”标签页中显示。

### 四、众筹详情

   在“我发起的”和“我参与的”标签页中，点选一个众筹后，下方即弹出“申请详情”按钮，点击后即显示当前众筹的请求信息：
   
   - 花费描述
   - 花费金额（当前请求需要使用到的金额数）
   - 商家地址（发起当前请求的钱包地址）
   - 当前赞成人数（当前同意此请求的人数）
   - 当前状态（分为voting、approved、completed三种状态）
   - 操作（“我发起的”标签页下为“支付”按钮；“我参与的”标签页下为“批准”按钮）
     - “支付”按钮需要在赞成人数超过参与人数一半时才可成功操作

### 五、付款请求投票机制

   在“我参与的”标签页中，点选一个众筹后，下方即弹出“申请详情”按钮，点击后即显示当前众筹的请求信息：
   
   - 基本信息与（四）中相同，只是操作变成了“批准”按钮。点击后即调用MetaMask来与区块链中的智能合约交互，来完成对当前请求的同意操作。



---

# 使用
   `注：浏览器需要安装MetaMask`
### 1.启动Ganache客户端（支持Infura代理和Ropsten网络）

    ganache-cli -p 7545

启动完成后记录下助记码，登入到MetaMask中

### 2.合约部署

文件02-deploy.js配置好web3的provider，本项目指定的是ganache客户端的HTTP://127.0.0.1:7545，然后运行此js

    node 02-deploy.js

运行完后日志会打印出部署完成合约的address，记录下来后在步骤3内使用

### 3.初始化智能合约实例

将步骤2获得的address，配置在src/eth/instance.js中的变量factoryAddress

### 4.启动react项目

    npm run start 或 yarn start








