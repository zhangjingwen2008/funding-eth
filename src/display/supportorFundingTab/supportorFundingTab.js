import React,{Component} from 'react';
import {getFundingDetails, showRequest,approveRequest} from '../../eth/interaction'
import CardList from "../common/CardList";
import {Button} from "semantic-ui-react";
import RequestTable from "../common/RequestTable";

class SupportorFundingTab extends Component{

    state={
        supportorFundingsDetails:[],
        selectedFundingDetail:'',
        requests:[],
    }

    async componentWillMount() {

        let supportorFundingsDetails = await getFundingDetails(3)
        this.setState({
            supportorFundingsDetails
        })
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

    handleApprove=async (index)=>{
        console.log('批准点击！',index);
        try {
            let res = await approveRequest(this.state.selectedFundingDetail.fundingAddress,index)
        } catch (e) {
            console.log(e)
        }
    }

    onCardClick=(selectedFundingDetail)=>{
        console.log('ccc:',selectedFundingDetail)
        this.setState({selectedFundingDetail})
    }

    render(){
        let {supportorFundingsDetails,selectedFundingDetail,requests}=this.state
        return(
            <div>
                <CardList details={supportorFundingsDetails} onCardClick={this.onCardClick}/>
                {
                    selectedFundingDetail && (
                        <div>
                            <Button onClick={this.handleShowRequests}>申请详情</Button>
                            <RequestTable requests={requests} handleApprove={this.handleApprove} pageKey={3} investorCount={selectedFundingDetail.getInvestorsCount}/>
                        </div>
                    )
                }
            </div>
        )
    }
}


export default SupportorFundingTab;