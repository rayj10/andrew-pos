import * as React from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: '1px solid #808080';
    padding-inline: 10px;
    margin-block: 3px;
`;

export default function OrderEntry({
    name,
    price
}){
    return <Container>
        <label>{name}</label>
        <label>{`$${price}`}</label>
    </Container>
}
