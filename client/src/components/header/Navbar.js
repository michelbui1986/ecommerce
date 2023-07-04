import React, { useContext } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);
  console.log(account);
  

  console.log(account);
  return (
    <header>
      <nav>
        <div className="left">
          <div className="navlogo">
            <NavLink to="/">
              <img src="./amazon_PNG25.png" alt="" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input type="text" />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">sign in</NavLink>
          </div>
          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}

            <p>cart</p>
          </div>

          {account ? (
            <Avatar
              className="avtar2"
              // onClick={handleClick}
              title={account.fname.toUpperCase()}>
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className="avtar" />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
