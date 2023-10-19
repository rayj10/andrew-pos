import { styled } from 'styled-components';

import MenuPanel from './MenuPanel';
import Orders from './Orders';
import { isPortrait } from '../functions/util';

const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.portraitMode ? 'column' : 'row'};
`;

function Main() {
  return (
    <Container portraitMode={isPortrait()}>
      <Orders/>
      <MenuPanel/>
    </Container>
  );
}

export default Main;
