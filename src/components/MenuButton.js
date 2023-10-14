import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from 'styled-components';

import { COLOR_CODE } from '../constants/menu';

const StyledDiv = styled.div`
    display: flex;
    height: 100px;
    width: 100px;
    justify-content: center;
    align-items: center;
    color: white;
    text-transform: none;
`;

const Price = styled.label`
    position: absolute;
    bottom: 5px;
    right: 5px;
`;

export default function MenuButton({
    name,
    price,
    category,
    onClick
}){
    return <Button 
        variant="contained" 
        onClick={() => onClick(name, price)}
        style={{
            backgroundColor: COLOR_CODE[category],
            margin: 5
        }}
    >
        <StyledDiv>
            {name}
            <Price>{`$${price}`}</Price>
        </StyledDiv>
  </Button>;
};