import React from "react";
import menu from "../asset/menu.png";
import { useState } from "react";
import closebtn from "../asset/icons8-close-64.png";
import SplitlineVr from "./splitlineVr";
import AddStudentModal from "../modals/addStudentModal";

export default function BurgerMenu({
  openNotfi,
  setOpenNotifi,
  openAndCloseNotfi,
  data,setdata
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const openAndClose = () => {
    setMenuOpen(!menuOpen);
  };

  const [addStdOpen, setAddStdOpen] = useState(false);
  const openAddStdClose = () => {
    setAddStdOpen(!addStdOpen);
  };

  return (
    <div className="burgericon">
      {" "}
      <img
        alt="menubutton"
        className="brgicon"
        src={menu}
        onClick={() => {
          console.log("hello");
          openAndClose();
        }}
      ></img>
      {menuOpen && (
        <div className="menu">
          <div className="top">
            <div className="user">
              <div className="userlogo">K</div>{" "}
              <div className="userdetails">
                <div className="name">Kamalesh</div>
                <div className="role">High-School Math Teacher</div>
              </div>
            </div>
            <div
              className="close-btn"
              onClick={() => {
                openAndClose();
              }}
            >
              <img alt="close button" src={closebtn} />
            </div>
          </div>
          <SplitlineVr />
          <div className="your">
            <div className="view">View Profile</div>
            <div className="picture">Add Profile Picture</div>
          </div>
          <SplitlineVr />
          <div className="function">
            {addStdOpen && (
              <AddStudentModal
                addStdOpen={addStdOpen}
                openAddStdClose={openAddStdClose}
                opnAndClose={openAndClose}
                data={data}
                setdata={setdata}
              />
            )}
            <div
              className="add"
              onClick={() => {
                openAddStdClose();
              }}
            >
              Add New Scholor
            </div>
            <div className="remove">Remove Scholor</div>
          </div>
          <SplitlineVr />
          <div className="logs">
            <div className="logout">Log Out</div>
            <div className="signup">Exit Organis</div>
            <div className="switchuser">Switch User</div>
          </div>
        </div>
      )}
    </div>
  );
}
