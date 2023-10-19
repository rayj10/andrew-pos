import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { connect } from 'react-redux'
import { styled } from 'styled-components';
import { Navigate } from "react-router-dom"

import { updateMenuList } from '../slice/MenuSlice';
import { logout } from '../functions/firebase';
import MenuMgmtModal from './MenuMgmtModal';
import { getMenuFromFB } from '../functions/menu';

const mapDispatchToProps = { 
    updateMenuList,
    getMenuFromFB
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-block: 5px;
    margin-inline: 20px;
`;

class MenuMgmtButtons extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            menuModalOpen: false
        };
    }

    handleBack = () => {
        logout()
        this.setState({redirect: true})
    }

    handleModalClose = () => {
        this.props.getMenuFromFB();
        this.setState({menuModalOpen: false});
    }

    render(){
        return <Container>
            { 
                this.state.redirect && 
                <Navigate to='/andrew-pos' replace={true}/>
            }
            <MenuMgmtModal 
                open={this.state.menuModalOpen} 
                onClose={this.handleModalClose.bind(this)}
            />
            <Button 
                variant="contained" 
                onClick={this.handleBack.bind(this)}
                style={{
                    backgroundColor: '#009DC4',
                    margin: 5,
                    height: 50
                }}
            >
                <ArrowBackIosNewIcon/>
            </Button>
            <Button 
                variant="contained" 
                onClick={() => this.setState({menuModalOpen: true})}
                style={{
                    backgroundColor: '#32CD32',
                    margin: 5,
                    height: 50
                }}
            >
                <AddIcon/>
            </Button>
        </Container>
    }
}
export default connect(null, mapDispatchToProps)(MenuMgmtButtons)