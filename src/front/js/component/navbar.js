import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logout();
  };
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">
			<img style={{ width: "3em", height: "3em" }} src = "https://static.vecteezy.com/system/resources/previews/022/750/436/non_2x/3d-home-icon-free-png.png"/></span>
        </Link>
        <div className="ml-auto">
          <Link to="/signup">
            <button className="btn btn-secondary mr-4">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-secondary mr-4">Login</button>
          </Link>
          <Link to="/logout">
            <button className="btn btn-secondary" onClick ={handleLogout}>Logout</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};