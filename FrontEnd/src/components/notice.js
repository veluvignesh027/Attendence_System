import React from "react";

export default function Notice({message,logo,type}) {
  return <div className={`notice ${type}`}>
    <div className="logo">
        <img alt="logo" src={logo}/>
    </div>
    <div className="message">
        {message}
    </div>
  </div>;
}
