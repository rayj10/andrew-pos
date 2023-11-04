import * as React from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-inline: 10px;
    padding-block: 3px;
    background-color: ${props => props.selected ? '#3AAFDC' : null};
`;

const Data = styled.label`
    width: 33%;
`;

export default function OrderEntry({
    name,
    price,
    qty,
    selected,
    onClick
}){
    return <Container selected={selected} onClick={onClick}>
        <Data>{name}</Data>
        <Data style={{textAlign: 'center'}}>{qty}</Data>
        <Data style={{textAlign: 'end'}}>{`$${parseFloat(price).toFixed(2)}`}</Data>
    </Container>
}
