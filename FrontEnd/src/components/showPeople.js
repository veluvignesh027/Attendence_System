import React from "react";

export default function ShowPeople({ role, count, logo }) {
  return (
    <div className="ShowPeople">
      <div className="logo">
        <div className="img">
          {" "}
          <img alt="role_logo" src={`${logo}`} />
        </div>
        <div className="role">{role}</div>
      </div>
      <div className="splitline"></div>
      <div className="count">{count}</div>
    </div>
  );
}


