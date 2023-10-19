import React, { useEffect } from "react";
import { useState } from "react";
export default function AddStudentModal({
  addStdOpen,
  openAddStdClose,
  opnAndClose,
  data,
  setdata,
  openAndCloseNotfi,
  setsuperdata,
  superdata,
}) 
{
  const [fname, setfname] = useState();
  const [lname, setlname] = useState();
  const [dob, setdob] = useState();
  const [remark, setremark] = useState();
  const rollno = data?.at(-1).rollno + 1;
  console.log(rollno);
  useEffect(()=>{
    console.log('mf-data changed');
  },[data])
  return (
    <div className="addstdmodal">
      <div className="addModal">
        <div
          className="cancleButton"
          onClick={() => {
            openAddStdClose();
          }}
        >
          x
        </div>
        <div className="heading">Add a New Scholor to the Organisation</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("hai");
            console.log(fname, lname, dob, remark);
            setdata([
              ...data,
              {
                rollno: rollno,
                fname: fname,
                dob: dob,
                remark: remark,
                performance: 50,
                present: true,
              },
            ]);
            openAddStdClose();
            openAndCloseNotfi();
          }}
        >
          <div className="form">
            <input
              className="firtsname"
              type="text"
              placeholder="FullName"
              value={fname}
              onChange={(e) => {
                setfname(e.target.value);
              }}
              required
            />
            <input
              className="lastname"
              type="text"
              placeholder="FatherName"
              value={lname}
              onChange={(e) => {
                setlname(e.target.value);
              }}
              required
            />
            <input
              className="date"
              type="date"
              title="select the D-O-B"
              value={dob}
              onChange={(e) => {
                setdob(e.target.value);
              }}
              required
            ></input>
            <input
              className="remarks"
              type="text"
              placeholder="Add Remarks"
              value={remark}
              onChange={(e) => {
                setremark(e.target.value);
              }}
              required
            ></input>
          </div>

          <div className="buttons">
            <button className="Add" type="submit">
              Add
            </button>
            <button
              className="cnl"
              onClick={() => {
                openAddStdClose();
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
