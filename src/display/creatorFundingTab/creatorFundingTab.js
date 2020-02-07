import React,{Component} from 'react';
import {getFundingDetails,createRequest,showRequest,finalizeRequest} from '../../eth/interaction'
import CardList from "../common/CardList";
import {Segment, Form, Label,Button} from "semantic-ui-react"
import RequestTable from "../common/RequestTable";

class CreatorFundingTab extends Component{

    state={
        creatorFundingsDetails:[],
        selectedFundingDetail:'',
        requestDesc:'',
        requestBalance:'',
        requestAddress:'',
        requests:[],
    }

    async componentWillMount() {

        let creatorFundingsDetails = await getFundingDetails(2)
        console.table(creatorFundingsDetails)

        this.setState({
            creatorFundingsDetails
        })
    }

    handleChange=(e,{name,value})=>this.setState({[name]: value})

    handleCreateRequest=async()=>{
        let {creatorFundingsDetails, selectedFundingDetail, requestDesc, requestBalance, requestAddress} = this.state
        console.log(requestDesc, requestBalance, requestAddress)
        try {
            let result = await createRequest(selectedFundingDetail.fundingAddress, requestDesc, requestBalance, requestAddress);
        } catch (e) {
            console.log(e)
        }
    }

    handleShowRequests = async() => {
        let address = this.state.selectedFundingDetail.fundingAddress;
        try {
            let requests = await showRequest(address);
            this.setState({requests})
            console.log(requests)
        } catch (e) {
            console.log(e)
        }
    };

    handleFinalize=async (index)=>{
        console.log('终结请求')
        try {
            let res = await finalizeRequest(this.state.selectedFundingDetail.fundingAddress, index);
        } catch (e) {
            console.log(e)
        }
    }

    onCardClick=(selectedFundingDetail)=>{
        console.log('aaa:',selectedFundingDetail)
        this.setState({selectedFundingDetail})
    }

    render(){
        let {creatorFundingsDetails, selectedFundingDetail, requestDesc, requestBalance, requestAddress,requests} = this.state
        return(
            <div>
                <CardList details={creatorFundingsDetails} onCardClick={this.onCardClick}/>

                {
                    <div>
                        <h3>发起付款请求</h3>

                        <Segment>
                            <h4>当前项目:{selectedFundingDetail.projectName}, 地址: {selectedFundingDetail.fundingAddress}</h4>
                            <Form onSubmit={this.handleCreateRequest}>
                                <Form.Input type='text' name='requestDesc' required value={requestDesc}
                                            label='请求描述' placeholder='请求描述' onChange={this.handleChange}/>

                                <Form.Input type='text' name='requestBalance' required value={requestBalance}
                                            label='付款金额' labelPosition='left' placeholder='付款金额'
                                            onChange={this.handleChange}>
                                    <Label basic>￥</Label>
                                    <input/>
                                </Form.Input>

                                <Form.Input type='text' name='requestAddress' required value={requestAddress}
                                            label='商家收款地址' labelPosition='left' placeholder='商家地址'
                                            onChange={this.handleChange}>
                                    <Label basic><span role='img' aria-label='location'>📍</span></Label>
                                    <input/>
                                </Form.Input>

                                <Form.Button primary content='开始请求'/>
                            </Form>
                        </Segment>
                    </div>
                }

                {
                    selectedFundingDetail && (
                        <div>
                            <Button onClick={this.handleShowRequests}>申请详情</Button>
                            <RequestTable requests={requests} handleFinalize={this.handleFinalize} pageKey={2} investorCount={selectedFundingDetail.getInvestorsCount}/>
                        </div>
                    )
                }
            </div>
        )
    }
}


export default CreatorFundingTab;