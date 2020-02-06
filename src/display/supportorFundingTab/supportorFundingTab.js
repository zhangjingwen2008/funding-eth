import React,{Component} from 'react';
import {getFundingDetails} from '../../eth/interaction'
import CardList from "../common/CardList";

class SupportorFundingTab extends Component{

    state={
        supportorFundingsDetails:[],
        selectedFundingDetail:'',
    }

    async componentWillMount() {

        let supportorFundingsDetails = await getFundingDetails(3)
        console.table(supportorFundingsDetails)

        this.setState({
            supportorFundingsDetails
        })
    }

    onCardClick=(selectedFundingDetail)=>{
        console.log('ccc:',selectedFundingDetail)
        this.setState({selectedFundingDetail})
    }

    render(){
        return(
            <CardList details={this.state.supportorFundingsDetails} onCardClick={this.onCardClick}/>
        )
    }
}


export default SupportorFundingTab;