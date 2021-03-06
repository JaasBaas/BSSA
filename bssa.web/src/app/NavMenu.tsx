import React from 'react';
import './NavMenu.css';
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from 'reactstrap';

interface NavMenuProps { }

interface NavMenuState {
  collapsed: Boolean;
}

export class NavMenu extends React.Component<NavMenuProps, NavMenuState> {
  // static displayName = Layout.name;

  constructor(props: Readonly<NavMenuProps>) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
          <Container>
            <NavbarBrand href="/">Bargain Shopper</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  {/* <NavLink tag={Link} to="/Product/Search"> */}
                  <NavLink href="/Product/Search">Products</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/TestPage">Test</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/catalogue/edit/2">New Catalogue</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
