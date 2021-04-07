import React from "react";
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";

export class IndexNavbar extends React.Component {
  render() {
    var loggedIn = false; //currently in place until we set up state for this
    return (
    <Navbar className="fixed-top" expand="lg" color="e7e7e7">
        <div className="navbar-translate">
          <NavbarBrand data-placement="bottom" href="/" title="Delicat">
          <img alt="Delicat Logo" width="100" src={require("assets/img/delicat.png").default} />
          </NavbarBrand>
        </div>
        <Collapse className="justify-content-end" navbar>
          <Nav navbar>
            <NavItem>
              <NavLink data-placement="bottom" href="/new-list" title="New List">
                <p className="navItem">New List</p>
              </NavLink>
            </NavItem>
            {loggedIn ?
              <>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle aria-expanded={false} aria-haspopup={true} data-toggle="dropdown" nav onClick={(e) => e.preventDefault()} role="button" >
                  <p className="navItem">
                    <i className="fa fa-user fa-2x"/>
                    Account
                  </p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-success" right>
                  <DropdownItem href="" onClick={(e) => e.preventDefault()}>
                    Saved Lists
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="" onClick={(e) => e.preventDefault()}>
                    Account Details
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="" onClick={(e) => e.preventDefault()}>
                    Reset Password
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="" onClick={(e) => e.preventDefault()}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              </>
              :
              <>
              <NavItem>
                <Button className="btn" color="success" href="/login" outline>Log in</Button>
              </NavItem>
              <NavItem>
                <Button className="btn" color="success" href="/register">Register</Button>
              </NavItem>
              </>
              }
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
