import React from 'react'
import { Tab } from 'semantic-ui-react'
import AllFundingTab from "./allFundingTab/allFundingTab";
import CreatorFundingTab from "./creatorFundingTab/creatorFundingTab";
import SupportorFundingTab from "./supportorFundingTab/supportorFundingTab";
import CreateFundingForm from "./creatorFundingTab/CreateFundingForm";

const panes = [
    { menuItem: '所有的', render: () => <Tab.Pane><AllFundingTab/></Tab.Pane> },
    { menuItem: '我发起的', render: () => <Tab.Pane><CreatorFundingTab/><CreateFundingForm/></Tab.Pane> },
    { menuItem: '我参与的', render: () => <Tab.Pane><SupportorFundingTab/></Tab.Pane> },
]

const TabCenter = () => <Tab panes={panes} />

export default TabCenter
