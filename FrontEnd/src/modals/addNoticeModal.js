import React from "react";
import Notificationmodal from "./notificationModal";
import { useState } from "react";

export default function AddNoticeModal({
  openmodal,
  opnAndClose,
  openNotfi,
  setOpenNotifi,
  openAndCloseNotfi,
  message,
  setmessage,
  type,
  settype,
  noticeData,
  setnoticeDate,
}) {
  return (
    <div className="addnoticemo">
      <div className="noticeModal">
        <div
          className="cancleButton"
          onClick={() => {
            opnAndClose(openmodal);
          }}
        >
          x
        </div>
        <div className="heading">Add a New Notice to display</div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log(noticeData);
            console.log(setnoticeDate);
            setnoticeDate([...noticeData,{message:message,type:type}])
            setmessage(null)
            opnAndClose(openmodal);
          }}
        >
          <div className="form">
            <select
              className="type"
              onChange={(e) => {
                settype(e.target.value);
              }}
              value={type}
            >
              Select the Notice type
              <option value={"warn"}>Warning</option>
              <option value={"good"}>Good</option>
              <option value={"bad"}>Bad Remark</option>
            </select>

            <input
              type="text"
              className="noticeMessage"
              required
              value={message}
              onChange={(e) => {
                setmessage(e.target.value);
              }}
              maxLength={28}
              placeholder="Add the Notice"
            />
          </div>
          <div className="buttons">
            <button className="Add" type="submit">
              Add
            </button>

            <button
              className="cnl"
              onClick={() => {
                opnAndClose();
              }}
            >
              Cancle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
