import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './navbar.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import icon from "../../../assets/logo/logo.png";


export default function Navbar2() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Navbar.Brand as={Link} to="/" className="navbar-brand">
        <img
          alt=""
          src={icon} // Make sure this path is correct
          width="35"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Mappy
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="middle">
          <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
          <Nav.Link as={Link} to="/leaderboard" className="nav-link">Leaderboard</Nav.Link>
          <Nav.Link as={Link} to="/about" className="nav-link">About us</Nav.Link>
          <NavDropdown title="Languages" id="basic-nav-dropdown" className="nav-dropdown">
            <NavDropdown.Item onClick={() => changeLanguage('ar')}>Arabic</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeLanguage('fr')}>French</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeLanguage('sp')}>Spanish</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Nav className="user">
          <Nav.Link as={Link} to="/login" className="nav-link">LogIn</Nav.Link>
          <Nav.Link as={Link} to="/signup" className="nav-link">SignUp</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
