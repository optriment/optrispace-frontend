import { Container } from 'semantic-ui-react';
import Menu from './Menu';

import 'semantic-ui-css/semantic.min.css';

const Layout = (props) => {
  return (
    <Container>
      <Menu />

      {props.children}
    </Container>
  );
}

export default Layout;
