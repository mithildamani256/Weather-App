import React from 'react'

export default function Recent(props) {
    let data;
    if(props.recent == null){
        data = "";
    } else {
        data = props.recent.map((recentData ,id)=>{
          return (
            <li onClick={()=> props.research(recentData.lat,recentData.lon)} key={id} className="bg-dark p-2 text-white mb-2">{recentData.city}</li>
          );
        });
    }
  return (
    <div className="recent-box border rounded float-left mt-5 text-center w-25">
      <h3 className="shadow py-2">Recent</h3>
      <ul className="text-center list-unstyled p-3">{data}</ul>
    </div>
  );
}