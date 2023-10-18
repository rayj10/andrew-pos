import { styled } from 'styled-components';

import MenuPanel from './MenuPanel';
import Orders from './Orders';

const Container = styled.div`
  display: flex;
  flex-direction: ${window.innerWidth >= 750 ? 'row' : 'column'};
`;

function Main() {
  return (
    <Container>
      <Orders/>
      <MenuPanel/>
    </Container>
  );
}

export default Main;
