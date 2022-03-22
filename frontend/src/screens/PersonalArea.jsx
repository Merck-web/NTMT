import React from "react";
import CardNews from "../components/CardNews/CardNews";


function PersonalArea() {
  return (
    <div className='personal-area'>
      <div className='content'>
        <div className='row title'>Личный кабинет</div>
      </div>
      <div>
        <CardNews />
      </div>
    </div>
  );
}

export default PersonalArea;
