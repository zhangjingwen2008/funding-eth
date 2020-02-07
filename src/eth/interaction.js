import {fundingFactoryInstance, newFundingInstance} from "./instance";
import web3 from '../utils/InitWeb3';

let getFundingDetails=async (index)=>{

    //index 1：所有页面， 2：我发起的页面， 3：我参与的页面
    //可以使用if语句进行控制，从而复用代码
    let currentFundings=[]
    let accounts = await web3.eth.getAccounts()
    if (index === 1) {
        //所有页面
        currentFundings=await fundingFactoryInstance.methods.getAllFundings().call();
    }else if (index === 2) {
        //我发起的页面
        currentFundings=await fundingFactoryInstance.methods.getCreatorFundings().call({
            from:accounts[0]
        });
    }else if (index === 3) {
        //我参与的页面
        currentFundings=await fundingFactoryInstance.methods.getSupportorFunding().call({
            from:accounts[0]
        });
    } else {

    }

    // console.table(creatorFundings)       //console.table()可以格式化打印数组和结构

    let detailsPromise = currentFundings.map(function (fundingAddress) {
        return new Promise(async (resolve, reject) => {
            try { // fundingInstance.options.address=fundingAddress          //获取funding实例，并为其填充地址，就可以使用了
                let newInstance = newFundingInstance()
                newInstance.options.address = fundingAddress
                let manager = await newInstance.methods.manager().call()
                let projectName = await newInstance.methods.projectName().call()
                let targetMoney = await newInstance.methods.targetMoney().call()
                let supportMoney = await newInstance.methods.supportMoney().call()
                let getLeftTime = await newInstance.methods.getLeftTime().call()
                let balance = await newInstance.methods.getBalance().call()
                let getInvestorsCount = await newInstance.methods.getInvestorsCount().call()

                let detail = {
                    fundingAddress,
                    manager,
                    projectName,
                    targetMoney,
                    supportMoney,
                    getLeftTime,
                    balance,
                    getInvestorsCount
                };
                resolve(detail)
            } catch (e) {
                reject(e)
            }
        })
    })

    let detailInfo=Promise.all(detailsPromise)
    return detailInfo
}

let createFunding = (projectName, targetMoney, supportMoney, duration) => {
    return new Promise(async (resolve, reject) => {
        try { // 调用创建方法
            console.log('createFunding Invoke :', projectName, targetMoney, supportMoney)
            let accounts = await web3.eth.getAccounts()
            let res = await fundingFactoryInstance.methods.createFunding(projectName, targetMoney, supportMoney, duration).send({
                    from: accounts[0],
                }
            )
            resolve(res)
        } catch (e) {
            reject(e)
        }
    })
}

let handleInvestFunc =  (fundingAddress, supportMoney) => {
    return new Promise(async(resolve, reject) => {
        try {
            let fundingInstance = newFundingInstance()
            fundingInstance.options.address = fundingAddress
            let accounts = await web3.eth.getAccounts();
            let res = await fundingInstance.methods.invest().send({
                from: accounts[0],
                value: supportMoney,
            })
            resolve(res)
        } catch (e) {
            reject(e)
        }
    })
}

let createRequest = (fundingAddress, purpose, cost, seller) => {
    return new Promise(async (resolve, reject) => {
        try {
            let accounts = await web3.eth.getAccounts();
            let newInstance = newFundingInstance();
            newInstance.options.address = fundingAddress;
            let result = await newInstance.methods.createRequest(purpose, cost, seller).send({
                from: accounts[0]
            });
            resolve(result)
        } catch (e) {
            reject(e)
        }
    });
};

const showRequest = (fundingAddress) => {
    return new Promise(async (resolve, reject) => {
        try {
            let accounts = await web3.eth.getAccounts()
            let newInstance = newFundingInstance()
            newInstance.options.address = fundingAddress

            //获取花费请求的数量
            let requestCount = await newInstance.methods.getRequestsCount().call({
                from: accounts[0]
            })

            //遍历请求数量，依次获取每一个请求的详情，添加到数组中
            let requestDetails = []
            for (let i = 0; i < requestCount; i++) {
                let requestDetail = await newInstance.methods.getRequestByIndex(i).call({
                    from: accounts[0]
                })
                requestDetails.push(requestDetail)
            }
            resolve(requestDetails)
        } catch (e) {
            reject(e)
        }
    });
};

const approveRequest = (fundingAddress,index) => {
    return new Promise(async (resolve, reject) => {
        try {
            let accounts = await web3.eth.getAccounts();
            let newInstance = newFundingInstance();
            newInstance.options.address = fundingAddress;
            let res = await newInstance.methods.approveRequest(index).send({
                from: accounts[0]
            });
            resolve(res)
        } catch (e) {
            reject(e)
        }
    });
};

const finalizeRequest = (fundingAddress,index) => {
    return new Promise(async (resolve, reject) => {
        try {
            let accounts = await web3.eth.getAccounts();
            let newInstance = newFundingInstance();
            newInstance.options.address = fundingAddress;
            let res = await newInstance.methods.finalizeRequest(index).send({
                from: accounts[0]
            });
            resolve(res)
        } catch (e) {
            reject(e)
        }
    });
};



export {
    getFundingDetails,
    createFunding,
    handleInvestFunc,
    createRequest,
    showRequest,
    approveRequest,
    finalizeRequest,
}