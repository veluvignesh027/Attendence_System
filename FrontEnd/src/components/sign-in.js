import React, { useState } from "react";

export default function Signin() {
  const [sign, setsign] = useState("si");
  return (
    <div className="sign-in">
      <div className="box">
        <div className="head">Kindly Sign-In to Enter Management</div>
        <div className="action">
          <button
            style={{
              background: `${sign === "si" ? "#a892f9" : ""}`,
              color: `${sign === "si" ? "#fff" : ""}`,
            }}
            className={`${"si"}`}
            onClick={() => {
              setsign("si");
            }}
          >
            Sign-In
          </button>
          <button
            style={{
              background: `${sign === "sp" ? "#a892f9" : ""}`,
              color: `${sign === "sp" ? "#fff" : ""}`,
            }}
            className={`${"sp"}`}
            onClick={() => {
              setsign("sp");
            }}
          >
            Sign-Up
          </button>
        </div>
        {sign === "si" && (
          <form className="form" onSubmit={(e)=>{e.preventDefault()}}>
            <input
              className="username"
              type="text"
              placeholder="Email"
            ></input>
            <input
              className="password"
              type="password"
              placeholder="Password"
            ></input>
            <button className="enter">Login-In</button>

          </form>
        )}
        {sign === "sp" && (
          <form className="form" onSubmit={(e)=>{
            e.preventDefault()
          }}>
            <input
              className="Email"
              type="text"
              placeholder="Eamil"
            ></input>
            <input
              className="Username"
              type="text"
              placeholder="UserName"
            ></input>
            <input
              className="password"
              type="password"
              placeholder="Password"
            ></input>
            <button className="sendotp">Send OTP</button>
            <input className="otp" placeholder="- - - - - - " maxLength={6}></input>
            <button className="enter">Verfiy & Sign-In</button>
          </form>
        )}
      </div>
    </div>
  );
}
