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
    menu,
    onClick
}){
    return <Button 
        variant="contained" 
        onClick={() => onClick(menu)}
        style={{
            backgroundColor: COLOR_CODE[menu.category],
            margin: 5
        }}
    >
        <StyledDiv>
            {menu.name}
            <Price>{`$${menu.price}`}</Price>
        </StyledDiv>
  </Button>;
};