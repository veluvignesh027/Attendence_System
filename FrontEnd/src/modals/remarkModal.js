import { useState } from "react";
import React from "react";

export default function RemarkModal({
  openRemark,
  setOpenRemark,
  data,
  setdata,
  fulldata,
  openAndCloseNotfi
}) {
  const [first, setfirst] = useState()
  return (
    <div className="remarkModal">
      <div className="remark">
        <div
          className="cancleButton"
          onClick={() => {
            setOpenRemark(!openRemark);
          }}
        >
          x
        </div>
        <div className="heading">Kindly Add Scholor Remark</div>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault()
            const updateList = fulldata.map((item) => {
              if (item.rollno === data.rollno) {
                console.log(item);
                return { ...item, remark: [...data.remark,first] };
              }
              return item;
            });
            setdata([...updateList]);
            openAndCloseNotfi()
            setOpenRemark(false);
          }}
        >
          <input className="remark" type="text" placeholder="Remark" value={first} onChange={(e)=>{setfirst(e.target.value)}}></input>
          <div className="buttons">
            <button className="Add" type="submit">
              Add
            </button>
            <button
              className="cnl"
              onClick={() => {
                setOpenRemark(!openRemark);
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
