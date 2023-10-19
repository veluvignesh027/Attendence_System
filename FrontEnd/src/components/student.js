import React from "react";
import { useState } from "react";
import StudentModal from "../modals/studentModal";
import RemarkModal from "../modals/remarkModal";
export default function Student({ data, setdata, fulldata,openAndCloseNotfi}) {
  // console.log(data);
  const [openDeatails, setopenDeatails] = useState(false);
  const [openRemark, setOpenRemark] = useState(false);
  const [sremark, setsremark] = useState('hello')
  return (
    <>
      {openDeatails && (
        <StudentModal
          openDeatails={openDeatails}
          setopenDeatails={setopenDeatails}
          data={data}
          setdata={setdata}
          fulldata={fulldata}
          openAndCloseNotfi ={openAndCloseNotfi}
        />
      )}
      {openRemark && (
        <RemarkModal openRemark={openRemark} setOpenRemark={setOpenRemark} data={data}
        setdata={setdata}
        fulldata={fulldata} openAndCloseNotfi={openAndCloseNotfi}/>
      )}
      <div className="student">
        <div className="dets">
          <div className="rollno">{data.rollno}</div>
          <div
            className="name"
            onClick={() => {
              setopenDeatails(!openDeatails);
            }}
          >
            {data.fname}
          </div>
        </div>
        <div className="actions">
          <button
            className="remark"
            onClick={() => {
              setOpenRemark(!openRemark);
            }}
          >
            Remark
          </button>
          <div className="work">
            <button
              style={{ opacity: `${data.present ? 1 : ""}` }}
              className="present"
              onClick={() => {

                const updateList = fulldata.map((item) => {
                  if (item.rollno === data.rollno) {
                    return { ...item, present: true };
                  }
                  return item;
                });
                setdata([...updateList])
              }}
            >
              Present
            </button>
            <button
              style={{ opacity: `${!data.present ? 1 : ""}` }}
              className="absent"
            
              onClick={() => {

                const updateList = fulldata.map((item) => {
                  if (item.rollno === data.rollno) {
                    return { ...item, present: false };
                  }
                  return item;
                });
                setdata([...updateList])
              }}
            >
              Absent
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
