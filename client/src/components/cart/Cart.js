import React from "react";
import { Divider } from "@mui/material";
import "./cart.css";
const Cart = () => {
  return (
    <div className="cart_section">
      <div className="cart_container">
        <div className="left_cart">
          <img src="" alt="cart_img" />
          <div className="cart_btn">
            <button className="cart_btn1">Add to Cart</button>
            <button className="cart_btn1">Buy now</button>
          </div>
        </div>
        <div className="right_cart">
          <h3>Fitness Gear</h3>
          <h4>Pigeon FAVOURITE Electric Kettle</h4>
          
          <p className="mrp">
            M.R.P. : <del></del>
          </p>
          <p>
            Deal of the Day :{" "}
            <span style={{ color: "#B12704" }}>650.00</span>
          </p>
          <p>
            You save :{" "}
            <span style={{ color: "#B12704" }}>
              {" "}
              20 (
             50%){" "}
            </span>
          </p>

          <div className="discount_box">
            <h5>
              Discount :{" "}
              <span style={{ color: "#111" }}>Extra 10%</span>{" "}
            </h5>
            <h4>
              FREE Delivery :{" "}
              <span style={{ color: "#111", fontWeight: "600" }}>
                Oct 8 - 21
              </span>{" "}
              Details
            </h4>
            <p style={{ color: "#111" }}>
              Fastest delivery:{" "}
              <span style={{ color: "#111", fontWeight: "600" }}>
                {" "}
                Tomorrow 11AM
              </span>
            </p>
          </div>
          <p className="description">
            About the Iteam :{" "}
            <span
              style={{
                color: "#565959",
                fontSize: "14px",
                fontWeight: "500",
                letterSpacing: "0.4px",
              }}>
              number 1
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
