import * as React from 'react';
import { styled } from 'styled-components';
import { connect } from 'react-redux'

import OrderEntry from '../components/OrderEntry';
import ActionButtons from '../components//ActionButtons';
import { isPortrait } from '../functions/util';
import { updateSelectedOrder } from '../slice/OrderSlice';
import { CATEGORY } from '../constants/menu';

const Container = styled.div`
    display: flex;
    flex-direction: ${props => props.portraitMode ? 'row' : 'column'};
    width: ${props => props.portraitMode ? '100%' : '30%'};
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
    orderLine: state.order.orderLine,
    selectedOrder: state.order.selectedOrder
});

const mapDispatchToProps = { 
    updateSelectedOrder
};

class Orders extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            portraitMode: isPortrait()
        };
    }

    componentDidMount(){
        window.addEventListener('resize', () => this.setState({portraitMode: isPortrait()}))
    }

    handleSelect = (item) => {
        this.props.updateSelectedOrder(item)
    }

    calculateTotal = () => {
        let total = 0;

        this.props.orderLine.forEach(item => {
            total += Number(item.price);
        })

        return parseFloat(total).toFixed(2);
    }

    consolidateOrder = () => {
        let consolidatedOrders = [];

        this.props.orderLine.forEach(item => { 
            if (item.category !== CATEGORY.extras || !item.parentId) {
                let extras = [];
                this.props.orderLine.forEach(line => {
                    if (line.parentId === item.orderId)
                        extras.push(line);
                });
                let orderIdx = consolidatedOrders.findIndex(entry => 
                    entry.name === item.name && 
                    entry.extras.length === 0
                );

                if (orderIdx >= 0 && extras.length === 0){
                    consolidatedOrders[orderIdx].qty += 1;
                    consolidatedOrders[orderIdx].price += Number(item.price);
                }
                else {
                    consolidatedOrders.push({
                        ...item,
                        extras: extras,
                        qty: 1
                    });
                    if (extras.length > 0){
                        extras.forEach(ex => {
                            consolidatedOrders.push(ex);
                        })
                    }
                }              
            }
        });

        return consolidatedOrders;
    }

    render(){
        return <Container className='order-manager' portraitMode={this.state.portraitMode}>
            <OrderContainer portraitMode={this.state.portraitMode}>
                <Title>Items</Title>
                <Divider/>
                <Details>
                    {
                        this.consolidateOrder().map((item, idx) => {
                            return <OrderEntry 
                                key={idx} 
                                {...item}
                                onClick={() => this.handleSelect(item)}
                                selected={this.props.selectedOrder.orderId === item.orderId}
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
export default connect(mapStateToProps, mapDispatchToProps)(Orders)