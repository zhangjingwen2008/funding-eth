import React from 'react'
import {Icon, Label, Menu, Table, Button} from 'semantic-ui-react';

const RequestTable  = (props) => {

    let {requests, handleApprove, pageKey, handleFinalize, investorCount} = props;
    let rowContainer = requests.map((request,i) => {        //map(数据,索引)
        return <RowInfo key={i} request={request} handleApprove={handleApprove} index={i} pageKey={pageKey} handleFinalize={handleFinalize} investorCount={investorCount}/>
    });

    return(
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>花费描述</Table.HeaderCell>
                    <Table.HeaderCell>花费金额</Table.HeaderCell>
                    <Table.HeaderCell>商家地址</Table.HeaderCell>
                    <Table.HeaderCell>当前赞成人数</Table.HeaderCell>
                    <Table.HeaderCell>当前状态</Table.HeaderCell>
                    <Table.HeaderCell>操作</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    rowContainer
                }
            </Table.Body>

        </Table>
    )
}

let RowInfo = (props) => {
    let {request, handleApprove, index, pageKey, handleFinalize, investorCount} = props;
    let {0:purpose, 1:cost, 2:seller, 3:approveCount, 4:status} = request
    let statusInfo=''
    if (status==0) {
        statusInfo = 'voting';
    }else if (status == 1) {
        statusInfo = 'approved';
    }else if (status == 2) {
        statusInfo = 'complete';
    }
    return (
        <Table.Row>
            <Table.Cell>{purpose}</Table.Cell>
            <Table.Cell>{cost}</Table.Cell>
            <Table.Cell>{seller}</Table.Cell>
            <Table.Cell>{approveCount}/{investorCount}</Table.Cell>
            <Table.Cell>{statusInfo}</Table.Cell>
            <Table.Cell>
                {
                    (pageKey == 2) ? (
                        <Button onClick={() => handleFinalize(index)}>支付</Button>
                    ) : (
                        <Button onClick={() => handleApprove(index)}>批准</Button>
                    )
                }
            </Table.Cell>
        </Table.Row>
    );
};

export default RequestTable
