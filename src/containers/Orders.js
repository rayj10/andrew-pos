import * as React from 'react';
import { styled } from 'styled-components';
import { connect } from 'react-redux'

import OrderEntry from '../components/OrderEntry';
import ActionButtons from '../components//ActionButtons';
import { isPortrait } from '../functions/util';

const Container = styled.div`
    display: flex;
    flex-direction: ${props => props.portraitMode ? 'row' : 'column'};
    width: ${props => props.portraitMode ? '80%' : '30%'};
`;

const OrderContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    border: 1px dashed #808080;
    height: 580px;
    width: ${props => props.portraitMode ? '100%' : null};
`;

const Title = styled.h4`
    margin-left: 5px;
    margin-block: 10px;
`;

const Details = styled.div`
    height: 500px;
    overflow: scroll;
`;

const Divider = styled.div`
    border-top: 1px solid #808080;
    margin-inline: 2px;
`;

const Total = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2px;
    margin-block: 3px;
    padding-inline: 5px;
    font-weight: 700;
`;

const mapStateToProps = state => ({
    orderLine: state.order.orderLine
});

class Orders extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedOrder: null
        };
    }

    calculateTotal = () => {
        let total = 0;

        this.props.orderLine.forEach(item => {
            total += Number(item.price);
        })

        return total;
    }

    consolidateOrder = () => {
        let consolidatedOrders = [];
        let orderIdx = -1;

        this.props.orderLine.forEach(item => { 
            orderIdx = consolidatedOrders.findIndex(entry => entry.name === item.name);
            if (orderIdx >= 0){
                consolidatedOrders[orderIdx].qty += 1;
                consolidatedOrders[orderIdx].price += item.price;
            }
            else
                consolidatedOrders.push({
                    ...item,
                    qty: 1
                })
        });

        return consolidatedOrders;
    }

    render(){
        return <Container className='order-manager' portraitMode={isPortrait()}>
            <OrderContainer portraitMode={isPortrait()}>
                <Title>Items</Title>
                <Divider/>
                <Details>
                    {
                        this.consolidateOrder().map((item, idx) => {
                            return <OrderEntry 
                                key={idx} 
                                {...item}
                                onClick={() => this.setState({selectedOrder: item.name})}
                                selected={this.state.selectedOrder === item.name}
                            />
                        })
                    }
                </Details>
                <Divider/>
                <Total>
                    <label>{'TOTAL:'}</label>
                    <label>{`$${this.calculateTotal()}`}</label>
                </Total>
            </OrderContainer>
            <ActionButtons selectedOrder={this.state.selectedOrder}/>
        </Container>
    }
}
export default connect(mapStateToProps)(Orders)