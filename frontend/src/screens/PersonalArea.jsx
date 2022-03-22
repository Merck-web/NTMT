import React from "react";
import CardNews from "../components/CardNews/CardNews";
import { Route } from "react-router-dom";

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
