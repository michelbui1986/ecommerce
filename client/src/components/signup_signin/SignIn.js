import React, { useState, useContext } from "react";
import "./signUp.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../context/ContextProvider";

const SignIn = () => {
  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate(); // useNavigate hook
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

  // send data to server
  const sendData = async (e) => {
    e.preventDefault();
    const { email, password } = logData;
    console.log("email:", email);
    try {
      const res = await fetch("http://localhost:8005/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 400 || !data) {
        console.log("invalid details");
        toast.error("Invalid Details 👎!", {
          position: "top-center",
        });
      } else {
        console.log("data valid");
        setAccount(data);
        setLogData({ ...logData, data, email: "", password: "" });
        toast.success("Login Successfully done 😃!", {
          position: "top-center",
        });
        navigate("/"); // use navigate function to navigate
      }
    } catch (error) {
      console.log("login page ka error" + error.message);
      toast.error("Account not found 👎!", {
        position: "top-center",
      });
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="amazonlogo" />
        </div>
        <div className="sign_form">
          <form form method="POST">
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

            <button className="signin_btn" onClick={sendData}>
              Continue
            </button>
          </form>
          <ToastContainer />
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
