import React from "react";

export default function PostDataModal({
  openpostmodal,
  setopenpostmodal,
  setsuperdata,
  data,
  setdata,
  openAndCloseNotfi
}) {
  return (
    <div className="postdatamodal">
      <div className="postmodal">
        <div
          className="cancleButton"
          onClick={() => {
            setopenpostmodal(!openpostmodal);
          }}
        >
          x
        </div>
        <div className="heading">Confirmation..!</div>
        <div className="message">
          By confirming this the current data will be saved and regrading will
          be sent to Scholor
        </div>
        <div className="buttons">
          <button
            className="post-modal"
            onClick={() => {
              console.log('clicked');
              setsuperdata([...data])
              setopenpostmodal(!openpostmodal);
              openAndCloseNotfi()
            }}
          >
            Post & Send Mail{" "}
          </button>
          <button
            className="cnl-modal"
            onClick={() => {
              setopenpostmodal(!openpostmodal);
            }}
          >
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
}
