import * as React from 'react';
import { styled } from 'styled-components';
import { connect } from 'react-redux'

import OrderEntry from '../components/OrderEntry';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    border: 1px dashed #808080;
    width: 30%;
    height: 580px;
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
    calculateTotal = () => {
        let total = 0;

        this.props.orderLine.forEach(item => {
            total += item.price;
        })

        return total;
    }

    render(){
        return <Container>
            <Title>Items</Title>
            <Divider/>
            <Details>
                {
                    this.props.orderLine.map((item, idx) => {
                        return <OrderEntry key={idx} {...item}/>
                    })
                }
            </Details>
            <Divider/>
            <Total>
                <label>{'TOTAL:'}</label>
                <label>{`$${this.calculateTotal()}`}</label>
            </Total>
        </Container>
    }
}
export default connect(mapStateToProps)(Orders)