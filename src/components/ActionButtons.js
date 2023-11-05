import * as React from 'react';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { connect } from 'react-redux'
import { styled } from 'styled-components';
import { Navigate } from "react-router-dom"

import { removeLastEntry, resetOrder, deleteEntry } from '../slice/OrderSlice';
import { isPortrait } from '../functions/util';

const mapDispatchToProps = { 
    removeLastEntry, resetOrder, deleteEntry
};

const mapStateToProps = state => ({
    selectedOrder: state.order.selectedOrder
});

const Container = styled.div`
    display: flex;
    flex-direction: ${props => props.portraitMode ? 'column' : 'row'};
    width: 30%;
    margin: 5px;
`;

class ActionButtons extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            portraitMode: isPortrait(),
        };
    }

    componentDidMount(){
        window.addEventListener('resize', () => this.setState({portraitMode: isPortrait()}))
    }

    render(){
        return <Container portraitMode={this.state.portraitMode}>
            { 
                this.state.redirect && 
                <Navigate to='/andrew-pos/admin' replace={true}/>
            }
            <Button 
                variant="contained" 
                onClick={this.props.resetOrder}
                style={{
                    backgroundColor: '#009DC4',
                    margin: 5,
                    height: 50,
                    width: 50
                }}
            >
                <RefreshIcon/>
            </Button>
            <Button 
                variant="contained" 
                onClick={this.props.removeLastEntry}
                style={{
                    backgroundColor: '#FEDC56',
                    margin: 5,
                    height: 50,
                    width: 50
                }}
            >
                <UndoIcon/>
            </Button>
            <Button 
                variant="contained" 
                onClick={() => this.props.deleteEntry(this.props.selectedOrder)}
                style={{
                    backgroundColor: '#FF4C4C',
                    margin: 5,
                    height: 50,
                    width: 50
                }}
            >
                <DeleteOutlineIcon/>
            </Button>
            <Button 
                variant="contained" 
                onClick={() => this.setState({redirect: true})}
                style={{
                    backgroundColor: '#737373',
                    margin: 5,
                    height: 50,
                    width: 50
                }}
            >
                <SettingsIcon/>
            </Button>
        </Container>
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons)