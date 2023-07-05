import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import { Drawer, IconButton, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RightHeader from "./RightHeader";
import { getProducts } from "../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {products} from "../home/productdata";
const usestyle = makeStyles({
  component: {
    marginTop: 10,
    marginRight: "-50px",
    width: "300px",
    padding: 50,
    height: "300px",
  },
});

const Navbar = () => {
  const classes = usestyle();
  const { account, setAccount } = useContext(LoginContext);

  const history = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl)

  const [text, setText] = useState("");
  console.log(text);
  // only for search
  const [liopen, setLiopen] = useState(true);
  const [dropen, setDropen] = useState(false);

  // const { products } = useSelector((state) => state.getproductsdata);
  console.log("products:", products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getdetailsvaliduser = async () => {
    const res = await fetch("http://localhost:8005/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log("from getdetailsvaliduser: ", data);

    if (res.status !== 201) {
      console.log("first login");
    } else {
      // console.log("cart add ho gya hain");
      setAccount(data);
    }
  };

  useEffect(() => {
    getdetailsvaliduser();
  }, []);

  // for logout
  const logoutuser = async () => {
    const res2 = await fetch("http://localhost:8005/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data2 = await res2.json();
    // console.log(data2);

    if (res2.status !== 201) {
      const error = new Error(res2.error);
      throw error;
    } else {
      console.log("data valid log out");

      history("/");
      setAccount(false);
      // setOpen(false);
      toast.success("user Logout 😃!", {
        position: "top-center",
      });
    }
  };

  // for drawer

  const handelopen = () => {
    setDropen(true);
  };

  const handleClosedr = () => {
    setDropen(false);
  };

  const getText = (items) => {
    // console.log(text);

    setText(items);
    setLiopen(false);
  };

  console.log(account);
  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handelopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          {/* here define the right header */}
          <Drawer open={dropen} onClose={handleClosedr}>
            <RightHeader logclose={handleClosedr} />
          </Drawer>
          <div className="navlogo">
            <NavLink to="/">
              {" "}
              <img src="./amazon_PNG25.png" alt="logo" />{" "}
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input
              type="text"
              name=""
              onChange={(e) => getText(e.target.value)}
              placeholder="Search your products"
            />
            <div className="search_icon">
              <i className="fas fa-search" id="search"></i>
            </div>

            {/* Search filter */}
            {text && (
              <List className="extrasearch" hidden={liopen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem>
                      <NavLink
                        to={`/getproductsone/${product.id}`}
                        onClick={() => setLiopen(true)}>
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            {account ? (
              <NavLink to="/home" onClick={(handleClose, logoutuser)}>
                sign out
              </NavLink>
            ) : (
              <NavLink to="/login">sign in</NavLink>
            )}
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
              onClick={handleClick}
              title={account.fname.toUpperCase()}>
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className="avtar" onClick={handleClick} />
          )}
          <div className="menu_div">
            <Menu
              anchorEl={open}
              open={Boolean(open)}
              onClose={handleClose}
              className={classes.component}>
              <MenuItem onClick={handleClose} style={{ margin: 10 }}>
                <NavLink to="/login" style={{ textDecoration: "none" }}>
                  My account
                </NavLink>
              </MenuItem>
              {account ? (
                <MenuItem
                  onClick={(handleClose, logoutuser)}
                  style={{ margin: 10 }}>
                  <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /> Logout
                </MenuItem>
              ) : (
                ""
              )}
            </Menu>
          </div>
          <ToastContainer />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
