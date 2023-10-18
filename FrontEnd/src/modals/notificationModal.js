import React from "react";

export default function Notificationmodal({openNotfi,
  setOpenNotifi,
  openAndCloseNotfi}) {
    console.log(openNotfi);
  return (
    <div className="notfiModal">
      <div className="notificaton">
        <div className="cancleButton" 
        onClick={()=>{openAndCloseNotfi()}}
        >x</div>
        <div className="heading">Notification</div>
        <div className="message">Operation Completed Sucessfully</div>
      </div>
    </div>
  );
}
