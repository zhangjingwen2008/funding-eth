import React, {Component} from 'react';
import web3 from './utils/InitWeb3';
import {fundingFactoryInstance} from'./eth/instance'
import TabCenter from "./display/TabCenter";

class App extends Component {

  constructor() {
    super();
    this.state={
      currentAccount:'',
    }
  }

  async componentWillMount() {
    let accounts=await web3.eth.getAccounts();
    console.log(accounts)

    let platformManager=await fundingFactoryInstance.methods.platformManager().call()
    console.log(platformManager)

    this.setState({
      currentAccount:accounts[0]
    })
  }

  render() {
    return (
        <div>
            <h1>靓仔众筹</h1>
            <p>当前帐户：{this.state.currentAccount}</p>
          <TabCenter/>
        </div>
    );
  }
}

export default App;
