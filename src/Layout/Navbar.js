import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 10px 0;
  transition: all 0.3s ease;
  height: ${({ isOpen }) => (isOpen ? "auto" : "0")};
  overflow: hidden;

  a {
    margin: 10px 0;
    text-decoration: none;
    color: black;
    font-weight: 500;

    &:hover {
      color: #3d8e3a;
    }
  }

  @media (min-width: 768px) {
    position: static;
    flex-direction: row;
    height: auto;
    justify-content: flex-end;

    a {
      margin: 0 15px;
    }
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;

`;

const LogoPart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Hamburger = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 30px;
  height: 20px;
  justify-content: space-between;

  div {
    width: 100%;
    height: 3px;
    background-color: black;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div>
      <Header>
        <LogoPart>
          <img
            src={logo}
            alt="logo"
            width="40px"
            height="40px"
            style={{ marginRight: "10px" }}
          />
          <Logo>Recruify</Logo>
        </LogoPart>
        <Hamburger onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </Hamburger>
        <Nav isOpen={menuOpen}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
          <NavLink to="/schedule" onClick={() => setMenuOpen(false)}>Schedule</NavLink>
        </Nav>
      </Header>
    </div>
  );
}
