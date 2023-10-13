import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../services/slices/userApiSlice";
import { setCredentiald } from "../services/slices/authSlice";
const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApi, {isLoading, isError}] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async(e) => {
      e.preventDefault()
     try {
      await logoutApi().unwrap()
      dispatch(setCredentiald(null)) 
      navigate('/')
     } catch (error) {
      console.log(error.data.message)
     }
  }
  return (
    <Navbar expand="lg" className="bg-primary text-light">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand className="text-light" href="/">
          React-Bootstrap
        </Navbar.Brand>
        {!userInfo ? (
          <Navbar
            className="text-light justify-content-end d-flex"
            id="basic-navbar-nav"
          >
            <Nav className="me-auto text-light d-flex gap-5 ">
              <Link to={"login"} className="text-light" href="/login">
                Sign In
              </Link>
              <Link to={"register"} className="text-light" href="/register">
                Sign Up
              </Link>
            </Nav>
          </Navbar>
        ) : (
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {userInfo.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link to="/profile">profile</Link>
              <Dropdown.Item 
              onClick={(e) => handleLogout(e)}
              >logout</Dropdown.Item>
           
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
