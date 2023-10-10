import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
const Header = () => {
  return (
    <Navbar  expand="lg" className="bg-primary text-light">
      <Container className='d-flex justify-content-between'>
        <Navbar.Brand className='text-light' href="/">React-Bootstrap</Navbar.Brand>
        <Navbar className='text-light justify-content-end d-flex' id="basic-navbar-nav">
          <Nav className="me-auto text-light " >
            <Nav.Link href="/login">Sign In</Nav.Link>
            <Nav.Link href="/register">Sign Up</Nav.Link>
             
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  )
}

export default Header