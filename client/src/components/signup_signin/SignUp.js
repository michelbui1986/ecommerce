import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./signUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [uData, setUData] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });
  console.log(uData);

  const addData = (e) => {
    const { name, value } = e.target;
    setUData(() => {
      return { ...uData, [name]: value };
    });
  };
  const sendData = async (e) => {
    e.preventDefault();
    const { fname, email, mobile, password, cpassword } = uData;
    

    const res = await fetch("http://localhost:8005/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fname, email, mobile, password, cpassword }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      toast.warn("🦄 Not yet", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.success("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setUData({
        ...uData,
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
      });
    }
  };
  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="amazonlogo" />
          </div>
          <div className="sign_form">
            <form method="POST">
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
              <button className="signin_btn" onClick={sendData}>
                Continue
              </button>
              <div className="signin_info">
                <p>Already have an account</p>
                <NavLink to="/login">Sign in</NavLink>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default SignUp;
