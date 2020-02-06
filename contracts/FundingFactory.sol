pragma solidity ^0.4.24;
//import './Funding.sol';

contract FundingFactory{
    
    address public platformManager;
    address[] allFundings;
    mapping(address=>address[]) creatorFundings;
    //mapping(address=>address[]) supportorFundings;
    SupportorFundingContract supportorFundings;
    
    constructor() public{
        platformManager=msg.sender;
        supportorFundings=new SupportorFundingContract();
    }
    
    function createFunding(string _name, uint _targetMoney, uint _supportMoney, uint _duration) public{
        address funding=new Funding(_name,_targetMoney,_supportMoney,_duration,msg.sender,supportorFundings);
        allFundings.push(funding);
        creatorFundings[msg.sender].push(funding);
    }
    
    function getAllFundings() public view returns(address[]){
        return allFundings;
    }
    
    function getCreatorFundings() public view returns(address[]){
        return creatorFundings[msg.sender];
    }
    
    function getSupportorFunding() public view returns(address[]){
        return supportorFundings.getFundings(msg.sender);
    }
    
}



contract SupportorFundingContract{
    mapping(address=>address[]) supportorFundingsMap;
    
    function setFunding(address _supportor, address _funding) public{
        supportorFundingsMap[_supportor].push(_funding);
    }
    
    function getFundings(address _supportor) public view returns(address[]){
        return supportorFundingsMap[_supportor];
    }
}



contract Funding{
    
    address public manager;
    string public projectName;
    uint256 public targetMoney;
    uint256 public supportMoney;
    //uint256 public duration;            //seconds
    uint256 public endTime;
    
    address[] investors;
    Request[] public allRequests;
    mapping(address=>bool) isInvestorMap;
    
    SupportorFundingContract supportorFundings;
    
    constructor(string _projectName, uint256 _targetMoney, uint256 _supportMoney, uint256 _duration,address _creator,SupportorFundingContract _supportorFundings) public{
        // manager=msg.sender;
        manager=_creator;
        projectName=_projectName;
        targetMoney=_targetMoney;
        supportMoney=_supportMoney;
        endTime=block.timestamp+_duration;
        supportorFundings=_supportorFundings;
    }
    
    struct Request{
        string purpose;
        uint256 cost;
        address seller;
        uint256 approveCount;
        RequestStatus status;
        mapping(address=>bool) isVotedMap;
    }
    
    enum RequestStatus{
        Voting,Approved,Completed
    }
    
    function invest() payable public{
        require(msg.value==supportMoney);
        investors.push(msg.sender);
        isInvestorMap[msg.sender]=true;
        supportorFundings.setFunding(msg.sender,this);
    }
    
    function refund() onlyManager public{
        for(uint256 i=0;i<investors.length;i++){
            investors[i].transfer(supportMoney);
        }
        delete investors;
    }
    
    function createRequest(string _purpose, uint256 _cost, address _seller) onlyManager public{
        Request memory req=Request({
            purpose:_purpose,
            cost:_cost,
            seller:_seller,
            approveCount:0,
            status:RequestStatus.Voting
        });
        allRequests.push(req);
    }
    
    function approveRequest(uint256 i) public{
        require(isInvestorMap[msg.sender]);
        Request storage req=allRequests[i];
        require(req.isVotedMap[msg.sender]==false);
        req.approveCount++;
        req.isVotedMap[msg.sender]=true;
    }
    
    function finalizeRequest(uint256 i) onlyManager public{
        Request storage req=allRequests[i];
        require(address(this).balance>=req.cost);
        require(req.approveCount*2>investors.length);
        req.seller.transfer(req.cost);
        req.status=RequestStatus.Completed;
    }
    
    modifier onlyManager(){
        require(msg.sender==manager);
        _;
    }
    
    function getLeftTime() public view returns(uint256){
        return endTime-block.timestamp;
    }
    
    function getInvestorsCount() public view returns(uint256){
        return investors.length;
    } 
    
    function getRequestsCount() public view returns(uint256){
        return allRequests.length;
    }
    
    function getRequestByIndex(uint256 i) public view returns(string,uint256,address,uint256,RequestStatus){
        Request memory req=allRequests[i];
        return (req.purpose,req.cost,req.seller,req.approveCount,req.status);
    }
    
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
    
    function getInvestors() public view returns(address[]){
        return investors;
    }
    
    
}
