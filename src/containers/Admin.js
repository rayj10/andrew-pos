import * as React from 'react';
import { styled } from 'styled-components';

import MenuMgmt from './MenuMgmt';
import MenuMgmtButtons from '../components/MenuMgmtButtons';
import LoginModal from '../components/LoginModal';
import { isLoggedIn } from '../functions/firebase';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

function Admin() {
    const [needLogin, setNeedLogin] = React.useState(!isLoggedIn());

    return (
        <Container>
            <LoginModal 
                open={needLogin} 
                onSuccess={() => setNeedLogin(false)}
            />
            <MenuMgmtButtons/>
            <MenuMgmt/>
        </Container>
    );
}

export default Admin;
