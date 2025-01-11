import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/psAIcoachi logo.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
        <img src={logo} alt="psAIcoachi" />
          psAIcoachi
        </Link>
      </div>
      <nav className="navbar">
        <Link to="#">Q&A</Link>
        <Link to="#">Scaling</Link>
        <Link to="#">GROW</Link>
        <Link to="/wheel">Wheel</Link>
      </nav>
    </header>
  );
};

export default Header;
