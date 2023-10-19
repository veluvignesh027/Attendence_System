import React from "react";
export default function StudentModal({openDeatails,setopenDeatails,data,setdata,fulldata,openAndCloseNotfi}) {
  return (
    <div className="studentmodal">
      <div className="databox">
        <div className="cancleButton" onClick={()=>{setopenDeatails(!openDeatails)}}>x</div>
        <div className="heading">Viewing the student detail here..!</div>
        <div className="wrap">
          <div className="det">
            <div className="logo">K</div>
            <div className="info">
              <div className="rno">Roll No : {data.rollno}</div>
              <div className="name">FullName : {data.fname} </div>
              <div className="dob">Dob : {data.dob}</div>
              <div className="fname">Father Name : {data.fathername}</div>
            </div>
          </div>
          <div className="status">
            <div className="remarks">
              <div className="top">Remarks</div>
              <ul className="list">
                {data.remark.map((data,i)=>{return (<li key={data+i}>{data}</li>)})}
              </ul>
            </div>
            <div className="perfomance">
              <div className="top">Scholor Perfomance</div>
              <div className="buttons">
                <button
                  className="plus"
                  onClick={() => {

                    const updateList = fulldata.map((item) => {
                      if (item.rollno === data.rollno) {
                        console.log(item);
                        return { ...item, performance : (data.performance < 100) ? data.performance + 10 : data.performance};
                      }
                      return item;
                    });
                    setdata([...updateList])
                  }}
                >
                  +
                </button>
                <button
                  className="mins"
                  onClick={() => {

                    const updateList = fulldata.map((item) => {
                      if (item.rollno === data.rollno) {
                        console.log(item);
                        return { ...item, performance : (data.performance > 30) ? data.performance - 10 : data.performance};
                      }
                      return item;
                    });
                    setdata([...updateList])
                  }}
                >
                  -
                </button>
              </div>
              <div className="score">
                <div className="point" style={{ width: `${data.performance}%` }}>
                  {data.performance}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
