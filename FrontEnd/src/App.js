import React, { useEffect } from "react";
import "./App.scss";
import { useState } from "react";

import Navbar from "./components/Navbar";
import ImprotantNotice from "./components/improtantNotice";
import StudentDetails from "./components/studentDetails";
import ShowPeople from "./components/showPeople";
import NoticeBoard from "./components/noticeBoard";
import student from "../src/asset/icons8-students-64.png";
import teacher from "../src/asset/icons8-teacher-64.png";
import Notificationmodal from "./modals/notificationModal";
// eslint-disable-next-line no-unused-vars
import Signin from "./components/sign-in";
import postdata from "./apis/postdata";

const modaldata = [
  {
    rollno: 244241,
    fname: "Pavaan",
    dob: "22/01/33",
    remark: ["good", "hello", "welcom"],
    fathername: "lokesh",
    performance: 50,
    present: false,
  },
  {
    rollno: 244242,
    fname: "Rupa",
    dob: "22/01/33",
    remark: ["good", "hello", "welcom"],
    fathername: "lokesh",
    performance: 50,
    present: false,
  },
  {
    rollno: 244243,
    fname: "guru",
    dob: "22/01/33",
    remark: ["good", "hello", "welcom"],
    fathername: "lokesh",
    performance: 50,
    present: true,
  },
  {
    rollno: 244244,
    fname: "vishnu",
    dob: "22/01/33",
    remark: ["good", "hello", "welcom"],
    fathername: "lokesh",
    performance: 50,
    present: true,
  },
  {
    rollno: 244245,
    fname: "kamalesh",
    dob: "22/01/33",
    remark: ["good", "hello", "welcom"],
    fathername: "lokesh",
    performance: 50,
    present: true,
  },
];

export default function App() {

  const [data, setdata] = useState([]);
  useEffect(() => {
    setdata(modaldata);
  },[]);

  useEffect(() => {
    console.log("main data changed");
    console.log(data);
  }, [data]);

  // eslint-disable-next-line no-unused-vars
  const [userName, setuserName] = useState("Kamalesh");
  const [openNotfi, setOpenNotifi] = useState(false);

  const openAndCloseNotfi = () => {
    console.log("called");
    setOpenNotifi(!openNotfi);
  };

  console.log('calling the post');
  postdata()

  return (
    <>
      {false && <Signin/>}
      {true && (
        <div>
          {openNotfi && (
            <Notificationmodal
              openNotfi={openNotfi}
              setOpenNotifi={setOpenNotifi}
              openAndCloseNotfi={openAndCloseNotfi}
            />
          )}
          <Navbar
            userName={userName}
            openNotfi={openNotfi}
            setOpenNotifi={setOpenNotifi}
            openAndCloseNotfi={openAndCloseNotfi}
            data={data}
            setdata={setdata}
          />
          <div className="main">
            <div className="mainOne">
              <ImprotantNotice />
              <StudentDetails
                data={data}
                setdata={setdata}
                openAndCloseNotfi={openAndCloseNotfi}
              />
            </div>
            <div className="mainTwo">
              <ShowPeople role={"Teachers"} count={30} logo={teacher} />
              <ShowPeople
                role={"Students"}
                count={data.length}
                logo={student}
              />
              <NoticeBoard
                userName={userName}
                openNotfi={openNotfi}
                setOpenNotifi={setOpenNotifi}
                openAndCloseNotfi={openAndCloseNotfi}
              />
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}
