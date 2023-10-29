import React, { useEffect } from "react";
import serachIcon from "../asset/icons8-search-50.png";
import Student from "./student";
import AddStudentModal from "../modals/addStudentModal";
import { useState } from "react";
import PostDataModal from "../modals/postDataModal";

export default function StudentDetails({ data, setdata, openAndCloseNotfi }) {
  const [search, setsearch] = useState(null);

  const [addStdOpen, setAddStdOpen] = useState(false);
  const openAddStdClose = () => {
    setAddStdOpen(!addStdOpen);
  };

  const [mfdata, setmfdata] = useState();

  const [openpostmodal, setopenpostmodal] = useState(false);

  // https://stackoverflow.com/questions/12409299/how-to-get-current-formatted-date-dd-mm-yyyy-in-javascript-and-append-it-to-an-i

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = yyyy + '-' + mm + '-' + dd;

  const [date,setdate] = useState(formattedToday)
  useEffect(() => {
    setmfdata(data);
  }, [data]);


  return (
    <>
      {addStdOpen && (
        <AddStudentModal
          addStdOpen={addStdOpen}
          openAddStdClose={openAddStdClose}
          setAddStdOpen={setAddStdOpen}
          data={mfdata}
          setdata={setmfdata}
          openAndCloseNotfi={openAndCloseNotfi}
          superdata={data}
          setsuperdata={setdata}
          date = {date}
          setdate = {setdate}
        />
      )}

      <div className="studentDetails">
        <div className="heading">Manage students attendance and activities</div>
        <div className="flow">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="search">
              <input
                placeholder="Search for a student"
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
              />
              <img
                alt="serachlogo"
                src={serachIcon}
                onClick={() => {
                  const modifydata =
                    search !== "" && search !== null && search !== undefined
                      ? data?.filter(
                          (item) => item.name.includes(search) && item
                        )
                      : data;
                  setmfdata(modifydata);
                  setsearch(null);
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
                setsuperdata = {setdata}
                data={mfdata}
                openAndCloseNotfi={openAndCloseNotfi}
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
            <input type="date" value={date} onChange={e=>{setdate(e.target.value)}}></input>
          </div>
        </div>
        <div className="details">
          {mfdata?.map((sdata, i) => {
            return (
              <Student data={sdata} setdata={setmfdata} fulldata={mfdata} openAndCloseNotfi={openAndCloseNotfi}/>
            );
          })}
        </div>
      </div>
    </>
  );
}
