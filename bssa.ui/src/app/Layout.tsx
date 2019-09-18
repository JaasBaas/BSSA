import React from 'react';
import { NavMenu } from './NavMenu';
import { Container } from 'reactstrap';

export class Layout extends React.Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
