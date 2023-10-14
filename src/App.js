import { styled } from 'styled-components';

import './App.css';
import MenuPanel from './containers/MenuPanel';
import Orders from './containers/Orders';

const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.width >= 750 ? 'row' : 'column'};
`;

function App() {
  return (
    <Container width={window.innerWidth}>
      <Orders/>
      <MenuPanel/>
    </Container>
  );
}

export default App;
