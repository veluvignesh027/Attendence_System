import React, { useEffect } from "react";
import serachIcon from "../asset/icons8-search-50.png";
import Student from "./student";
import AddStudentModal from "../modals/addStudentModal";
import { useState } from "react";
import PostDataModal from "../modals/postDataModal";
export default function StudentDetails({ data, setdata }) {
  const [search, setsearch] = useState(null)
  const [addStdOpen, setAddStdOpen] = useState(false);
  const openAddStdClose = () => {
    setAddStdOpen(!addStdOpen);
  };
  const [mfdata,setmfdata] =useState()
  const [openpostmodal, setopenpostmodal] = useState(false);
  useEffect(()=>{setmfdata(data)},[data])
  // console.log(data);
  useEffect(()=>{console.log('changed');console.log(mfdata);},[mfdata])
  return (
    <>
      {addStdOpen && (
        <AddStudentModal
          addStdOpen={addStdOpen}
          openAddStdClose={openAddStdClose}
          setAddStdOpen={setAddStdOpen}
          data={mfdata}
          setdata={setmfdata}
        />
      )}

      <div className="studentDetails">
        <div className="heading">Manage students attendance and activities</div>
        <div className="flow">
          <form onSubmit={(e)=>{e.preventDefault()}}>
            <div className="search">
              <input placeholder="Search for a student" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
              <img alt="serachlogo" src={serachIcon}
              onClick={()=>{
                console.log(search);
                const modifydata = (search !== '' && search !== null && search !== undefined)?data.filter((item)=>((item.fname.includes(search)) && item)) : data
                console.log(modifydata);
                setmfdata(modifydata)
                setsearch(null)
              }}
              ></img>
            </div>
          </form>
          <div className="buttons">
            <button
              className="add"
              onClick={() => {
                openAddStdClose();
              }}
            >
              ADD
            </button>
            {openpostmodal && (
              <PostDataModal
                openpostmodal={openpostmodal}
                setopenpostmodal={setopenpostmodal}
              />
            )}
            <button
              className="post"
              onClick={() => {
                setopenpostmodal(!openpostmodal);
              }}
            >
              POST
            </button>
          </div>
        </div>
        <div className="Fliter">
          <div className="header">
            <div className="sn"> S.No </div>
            <div className="stname"> Std Name</div>
          </div>
          <div className="date">
            <input type="date"></input>
          </div>
        </div>
        <div className="details">
          {mfdata?.map((sdata, i) => {
            return (
              <Student data={sdata}  setdata={setmfdata} fulldata ={mfdata}/>
            );
          })}
        </div>
      </div>
    </>
  );
}
