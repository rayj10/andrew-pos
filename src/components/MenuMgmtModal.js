import * as React from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { styled } from 'styled-components';

import { MENU_FIELDS, MENU_FIELD_ID } from '../constants/menu';
import { modifyMenu, deleteMenu } from '../functions/firebase';

const Container = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const ModalInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80%;
    width: 70%;
    border-radius: 8px;
    background-color: white;
    align-self: center;
    overflow: scroll;
`;

const Title = styled.h2`
    margin-block: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export default function MenuMgmtModal({
    open,
    onClose,
    defaultValues
}){
    const [input, setInput] = React.useState({});
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleAdd = () => {
        setLoading(true);
        let path = `menu/${input[MENU_FIELD_ID.id]}`;
        let menuObj = {
            [MENU_FIELD_ID.name]: input[MENU_FIELD_ID.name],
            [MENU_FIELD_ID.price]: input[MENU_FIELD_ID.price],
            [MENU_FIELD_ID.category]: input[MENU_FIELD_ID.category],
            [MENU_FIELD_ID.sub]: input[MENU_FIELD_ID.sub]
        };

        modifyMenu(menuObj, path)
            .then(() => {
                setLoading(false);
                onClose();
            })
            .catch(e => {
                setError(JSON.stringify(e))
                setLoading(false);
            });
    }

    const handleEdit = () => {
        setLoading(true);
        let path = `menu/${defaultValues[MENU_FIELD_ID.id]}`;
        let menuObj = {
            [MENU_FIELD_ID.name]: input[MENU_FIELD_ID.name] ?? defaultValues[MENU_FIELD_ID.name],
            [MENU_FIELD_ID.price]: input[MENU_FIELD_ID.price] ?? defaultValues[MENU_FIELD_ID.price],
            [MENU_FIELD_ID.category]: input[MENU_FIELD_ID.category] ?? defaultValues[MENU_FIELD_ID.category],
            [MENU_FIELD_ID.sub]: input[MENU_FIELD_ID.sub] ?? defaultValues[MENU_FIELD_ID.sub]
        };

        modifyMenu(menuObj, path)
            .then(() => {
                setLoading(false);
                onClose();
            })
            .catch(e => {
                setError(JSON.stringify(e))
                setLoading(false);
            });
    }

    const handleDelete = () => {
        setLoading(true);
        let path = `menu/${defaultValues[MENU_FIELD_ID.id]}`;
        deleteMenu(path)
            .then(() => {
                setLoading(false);
                onClose();
            })
            .catch(e => {
                setError(JSON.stringify(e))
                setLoading(false);
            });
    }

    const handleInput = (key, val) => {
        let currentInput = input;
        currentInput[key] = val
        setInput(currentInput);
    }

    return <Modal
        open={open}
        style={{ backdropFilter: "blur(1px)", backgroundColor: 'rgba(255,255,255,0.5)'}}        
    >
        <Container>
            <ModalInner>
                <Title>
                    {`${defaultValues ? 'Edit' : 'Add'} Menu Item`}
                </Title>
                {
                    error &&
                    <Alert onClose={() => setError('')} severity="error" style={{marginBottom: 20}}>
                        {error}
                    </Alert>
                }
                {
                    MENU_FIELDS.map(field => {
                        return <TextField
                            key={field.id}
                            disabled={defaultValues && field.id === MENU_FIELD_ID.id}
                            defaultValue={defaultValues ? defaultValues[field.id] : ''}
                            select={field.select ? true : false}
                            style={{marginBlock: 10, width: '40%'}}
                            helperText={field.helper}
                            onChange={(e) => handleInput(field.id, e.target.value)}
                            label={field.label}
                        >
                            {
                                field.select &&
                                Object.keys(field.select).map(id => {
                                    return <MenuItem key={id} value={field.select[id]}>
                                        {field.select[id]}
                                    </MenuItem>
                                })
                            }
                        </TextField>
                    })
                }
                {
                    loading ?
                        <CircularProgress style={{color: '#050A30'}}/>
                        :
                        <ButtonContainer>
                            {
                                defaultValues &&
                                <Button 
                                    variant="contained" 
                                    onClick={handleDelete}
                                    style={{
                                        backgroundColor: '#FF4C4C',
                                        margin: 15,
                                        width: 200,
                                        height: 50
                                    }}
                                >
                                    Delete
                                </Button>
                            }
                            <Button 
                                variant="contained" 
                                onClick={onClose}
                                style={{
                                    backgroundColor: '#A6A6A6',
                                    margin: 15,
                                    width: 200,
                                    height: 50
                                }}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="contained" 
                                onClick={defaultValues ? handleEdit : handleAdd}
                                style={{
                                    backgroundColor: '#050A30',
                                    margin: 15,
                                    width: 200,
                                    height: 50
                                }}
                            >
                                {defaultValues ? 'Save' : 'Add'}
                            </Button>
                    </ButtonContainer>   
                }        
            </ModalInner>
        </Container>
    </Modal>
}
