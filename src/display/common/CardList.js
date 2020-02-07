import React from 'react'
import { Card,Image,Icon,Progress,List } from 'semantic-ui-react'

const src = '/images/person.png'

const CardList = (props) => {

    let details = props.details
    let onCardClick=props.onCardClick
    console.table(details)

    let cards=details.map(detail=>{
        return <CardFunding key={detail.fundingAddress} detail1={detail} onCardClick={onCardClick}/>
    })

    return (
        <Card.Group itemsPerRow={4}>
            {cards}
        </Card.Group>
    )
}

const CardFunding = (props) => {

    let detail=props.detail1
    let onCardClick=props.onCardClick

     let {fundingAddress,manager,projectName,targetMoney,supportMoney,getLeftTime,balance,getInvestorsCount}=detail
    let percent = parseFloat(balance) / parseFloat(targetMoney) * 100

    return (
        // <Card onClick={() => onCardClick && onCardClick(detail2)}>
        <Card onClick={() => onCardClick && onCardClick(detail)}>
            <Image src='/images/person.png'/>
            <Card.Content>
                <Card.Header>{projectName}</Card.Header>
                <Card.Meta>
                    <span className='date'>剩余时间:{getLeftTime}</span>
                    <Progress percent={percent} progress size='small'/>
                </Card.Meta>
                <Card.Description>用过的都说好!</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <List horizontal style={{display: 'flex', justifyContent: 'space-around'}}>
                    <List.Item>
                        <List.Content>
                            <List.Header>已筹</List.Header>
                            {balance} wei
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>已达</List.Header>
                            {percent}%
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header>参与人数</List.Header>
                            {getInvestorsCount}
                        </List.Content>
                    </List.Item>
                </List>
            </Card.Content>
        </Card>
    );
}

export default CardList