import React, { useEffect } from "react";
import Notice from "./notice";
import good from "../asset/icons8-notice1-64.png";
import warn from "../asset/icons8-notice2-50.png";
import bad from "../asset/icons8-notice3-50.png";
import AddNoticeModal from "../modals/addNoticeModal";
import { useState } from "react";

export default function NoticeBoard({
  openNotfi,
  setOpenNotifi,
  openAndCloseNotfi,
}) {

  const [openmodal, setOpenModal] = useState(false);
  const opnAndClose = () => {
    setOpenModal(!openmodal);
  };

  const [noticeData, setnoticeDate] = useState([]);
  const [message, setmessage] = useState();
  const [type, settype] = useState("good");

  useEffect(()=>{
    setnoticeDate([{message:'newley dated', type:'good'}])
  },[])
  return (
    <>
      {openmodal && (
        <AddNoticeModal
          openmodal={openmodal}
          opnAndClose={opnAndClose}
          openNotfi={openNotfi}
          setOpenNotifi={setOpenNotifi}
          openAndCloseNotfi={openAndCloseNotfi}
          message={message}
          setmessage={setmessage}
          type={type}
          settype={settype}
          noticeData={noticeData}
          setnoticeDate={setnoticeDate}
        />
      )}
      <div className="noticeBoard">
        <div className="top">
          <div className="heading"> Notice Board </div>
          <div
            className="addnoticebutton"
            onClick={() => {
              opnAndClose();
            }}
          >
            +
          </div>
        </div>
        <div className="notices">
          {noticeData?.map((data, i) => {
            let logoout =
              data.type === "bad" ? bad : data.type === "warn" ? warn : good;
            return (
              <Notice
                key={data.message + data.type + i}
                message={data.message}
                type={data.type}
                logo={logoout}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
