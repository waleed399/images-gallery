import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { ReactComponent as Logo } from "../images/logo.svg";

const navbarStyle = {
  backgroundColor: "#eeeeee",
};

const Header = (props) => {
  const { title } = props;
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <Logo style={{maxWidth: '26rem',maxHeight:'4rem'}}/>
      </Container>
    </Navbar>
  );
};

export default Header;
