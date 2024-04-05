import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logoImage from "../assets/logo.png"; // Import the image

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <div className="container">
        {/* Replace text with image */}
        <NavLink to="/" className="navbar-brand" style={{ left: "2%" }}>
          <img
            src={logoImage}
            alt="Logo"
            style={{ width: "120px", height: "auto" }}
          />
        </NavLink>

        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
          style={{ marginLeft: "27%" }}
        >
          <ul className="navbar-nav m-auto my-1 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" style={{ color: "white" }}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/about"
                style={{ color: "white" }}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contact"
                style={{ color: "white" }}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="buttons text-center" style={{ marginLeft: "10%" }}>
            <NavLink
              to="/login"
              className="btn btn-outline-dark m-2"
              style={{ color: "white" }}
            >
              <i className="fa fa-sign-in-alt mr-1"></i> Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn btn-outline-dark m-2"
              style={{ color: "white" }}
            >
              <i className="fa fa-user-plus mr-1"></i> Register
            </NavLink>
            <NavLink
              to="/cart"
              className="btn btn-outline-dark m-2"
              style={{ color: "white" }}
            >
              <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
