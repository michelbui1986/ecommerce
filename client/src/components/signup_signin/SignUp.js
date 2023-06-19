import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./signUp.css";

const SignUp = () => {
  const [uData, setUData] = useState({
    fname: "",
    email: "",
    moblie: "",
    password: "",
    cpassword: "",
  });

  const addData = (e) => {
    const { name, value } = e.target;
    setUData((pre) => {
      return { ...pre, [name]: value };
    });
  };
  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="amazonlogo" />
          </div>
          <div className="sign_form">
            <form>
              <h1>Create account</h1>
              <div className="form_data">
                <label htmlFor="fname">Your name</label>
                <input
                  type="text"
                  onChange={addData}
                  value={uData.fname}
                  name="fname"
                  id="fname"
                />
              </div>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  onChange={addData}
                  value={uData.email}
                  name="email"
                  id="email"
                />
              </div>
              <div className="form_data">
                <label htmlFor="number">Mobile</label>
                <input
                  type="text"
                  onChange={addData}
                  value={uData.mobile}
                  name="mobile"
                  id="mobile"
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  onChange={addData}
                  value={uData.password}
                  name="password"
                  id="password"
                  placeholder="At least 6 char"
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password again</label>
                <input
                  type="password"
                  onChange={addData}
                  value={uData.cpassword}
                  name="cpassword"
                  id="cpassword"
                />
              </div>
              <button className="signin_btn">Continue</button>
              <div className="signin_info">
                <p>Already have an account</p>
                <NavLink to="/login">Sign in</NavLink>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
