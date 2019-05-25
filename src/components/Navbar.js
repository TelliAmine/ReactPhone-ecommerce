import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import { ButtonContainer } from "./Button";
import styled from "styled-components";
//import { ProductConsumer } from "../context";

export default class Navbar extends Component {
  render() {
    return (
      //<ProductConsumer>
      <NavWrapper className="navbar navbar-expand-sm   navbar-darj px-sm-5">
        <Link to="/">
          <img src={logo} alt="store" className="navbar-brand" />
        </Link>
        <ul className="navbar-nav align-items-center ">
          <li className="nav-item ml-5">
            <Link to="/" className="navbar-link">
              Products
            </Link>
          </li>
        </ul>
        <Link to="card" className="ml-auto">
          <ButtonContainer>
            <span className="mr-2">
              {" "}
              <i className="fas fa-cart-plus" />
            </span>
            My Cart
          </ButtonContainer>
        </Link>
      </NavWrapper>
      //</ProductConsumer>
    );
  }
}
const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .navbar-link {
    color: var(--mainWhite) !important;
    font-size: 1.4rem;
  }
`;
