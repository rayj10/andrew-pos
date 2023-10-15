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

export default function OrderEntry({
    name,
    price,
    selected,
    onClick
}){
    return <Container selected={selected} onClick={onClick}>
        <label>{name}</label>
        <label>{`$${price}`}</label>
    </Container>
}
