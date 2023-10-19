import * as React from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { styled } from 'styled-components';

import { login } from '../functions/firebase';

const ModalInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export default function LoginModal({
    open,
    onSuccess
}){
    const [showSecret, setShowSecret] = React.useState(false);
    const [secret, setSecret] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleLogin = () => {
        setLoading(true);
        login(secret)
            .then(user => {
                if (user)
                    onSuccess(user);
                else
                    setError('Invalid Secret');
            })
            .catch(e => {
                setLoading(false);
                setError(e.code);
            });
    }

    return <Modal
        open={open}
        style={{ backdropFilter: "blur(1px)", backgroundColor: 'rgba(255,255,255,0.5)'}}        
    >
        <ModalInner>
            {
                loading ?
                    <CircularProgress style={{color: '#050A30'}}/>
                    :
                    <>
                        {
                            error &&
                            <Alert onClose={() => setError('')} severity="error" style={{marginBottom: 20}}>
                                {error}
                            </Alert>
                        }
                        <TextField
                            id="outlined-adornment-password"
                            type={showSecret ? 'text' : 'password'}
                            onChange={(e) => setSecret(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline' : {
                                    borderColor: 'white'
                                },
                                '& :hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white'
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white'
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'white'
                                },
                                '& .MuiInputBase-root': {
                                    color: 'white'
                                }
                            }}
                            onKeyDown={e => e.key === 'Enter' && handleLogin()}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle secret visibility"
                                        onClick={() => setShowSecret(!showSecret)}
                                        edge="end"
                                        >
                                            {
                                                showSecret ? 
                                                    <VisibilityOff style={{color: 'white'}} /> : 
                                                    <Visibility style={{color: 'white'}}/>
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            label="Secret"
                        />
                        <Button 
                            variant="contained" 
                            onClick={handleLogin}
                            style={{
                                backgroundColor: '#050A30',
                                margin: 15,
                                width: 200,
                                height: 50
                            }}
                        >
                            Login
                        </Button>
                    </>
            } 
        </ModalInner>
    </Modal>
}
