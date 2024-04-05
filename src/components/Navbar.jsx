import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logoImage from "../assets/logo.png";

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);

  // Calculate total quantity of items in the cart
  const totalQuantity = state.reduce((total, item) => total + item.qty, 0);

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
          className="navbar-toggler mx-2 collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ backgroundColor: "white" }}
        >
          <span
            className="navbar-toggler-icon"
            style={{
              display: "inline-block",
              width: "1.5em",
              height: "1.5em",
              verticalAlign: "middle",
              backgroundImage:
                "url(\"data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='black' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              transition: "transform 0.2s ease",
            }}
          ></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
          style={{ marginLeft: "27%" }}
        >
          <ul className="navbar-nav m-auto my-1 text-center">
            <li className="nav-item" style={{ marginRight: "20px" }}>
              <NavLink className="nav-link" to="/" style={{ color: "white" }}>
                Home
              </NavLink>
            </li>
            <li className="nav-item" style={{ marginRight: "20px" }}>
              <NavLink
                className="nav-link"
                to="/about"
                style={{ color: "white" }}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item" style={{ marginRight: "20px" }}>
              <NavLink
                className="nav-link"
                to="/contact"
                style={{ color: "white" }}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div
            className="buttons text-center"
            style={{ marginLeft: "10%", color: "white" }}
          >
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
              <i className="fa fa-cart-shopping mr-1"></i> Cart ({totalQuantity}
              )
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
