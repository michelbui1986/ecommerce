import React, { useState } from "react";
import "./signUp.css";
import { NavLink } from "react-router-dom";
const SignIn = () => {
  const [logData, setLogData] = useState({
    email: "",
    password: "",
  });

  const addData = (e) => {
    const { name, value } = e.target;
    setLogData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="amazonlogo" />
        </div>
        <div className="sign_form">
          <form>
            <h1>Sign-In</h1>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={addData}
                value={logData.email}
                name="email"
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={addData}
                value={logData.password}
                name="password"
                id="password"
                placeholder="At least 6 char"
              />
            </div>
            <button className="signin_btn">Continue</button>
          </form>
        </div>
        <div className="create_accountinfo">
          <p>New to Amazon</p>

          <NavLink to="/register">
            <button>Create your Amazon account</button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
