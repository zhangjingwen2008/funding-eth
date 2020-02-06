import React,{Component} from 'react';
import {getFundingDetails,handleInvestFunc} from '../../eth/interaction'
import CardList from "../common/CardList";
import {Dimmer, Form, Label, Loader, Segment} from "semantic-ui-react";

class AllFundingTab extends Component{

    state={
        active:false,
        allFundingsDetails:[],
        selectedFundingDetail:'',
    }

    async componentWillMount() {

        let allFundingsDetails = await getFundingDetails(1)
        console.table(allFundingsDetails)

        this.setState({
            allFundingsDetails
        })
    }

    onCardClick=(selectedFundingDetail)=>{
        this.setState({selectedFundingDetail})
    }

    handleInvest=async ()=>{
        let {fundingAddress, manager, projectName, targetMoney, supportMoney, getLeftTime, balance, getInvestorsCount} = this.state.selectedFundingDetail
        this.setState({active: true})
        try {
            let res=await handleInvestFunc(fundingAddress, supportMoney)
            this.setState({active: false})
        } catch (e) {
            throw e
            this.setState({active: false})
        }
    }

    render(){
        let {fundingAddress, manager, projectName, targetMoney, supportMoney, getLeftTime, balance, getInvestorsCount} = this.state.selectedFundingDetail
        return(
            <div>
                <CardList details={this.state.allFundingsDetails} onCardClick={this.onCardClick}/>
                <div>
                    <h3>参与众筹</h3>
                    <Dimmer.Dimmable as={Segment} dimmed={this.state.active}>
                        <Dimmer active={this.state.active} inverted>
                            <Loader>支持中</Loader>
                        </Dimmer>
                        <Form onSubmit={this.handleInvest}>
                            <Form.Input type='text' value={projectName || ''} label='项目名称:'/>
                            <Form.Input type='text' value={fundingAddress || ''} label='项目地址:'/>
                            <Form.Input type='text' value={supportMoney || ''} label='支持金额:'
                                        labelPosition='left'>
                                <Label basic>￥</Label>
                                <input/>
                            </Form.Input>

                            <Form.Button primary content='参与众筹'/>
                        </Form>
                    </Dimmer.Dimmable>
                </div>
            </div>
        )
    }
}


export default AllFundingTab;