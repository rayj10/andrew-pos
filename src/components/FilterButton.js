import * as React from 'react';
import Button from '@mui/material/Button';

export default function FilterButton({
    id,
    name,
    onClick,
    selected = false
}){
    return <Button 
        variant="contained" 
        onClick={() => onClick(id)}
        style={{
            background: selected ? '#167D7F' : '#98D7C2',
            color: 'white',
            margin: 5,
            textTransform: 'none'
        }}
    >
        {name}
    </Button>;
};