import React from "react";
import "./Row.css";

function RowNotification() {
  return (
    <div className='row row-n'>
      <div className='row-icon'>
        <img src='images/icons/convert.svg' alt='1' />
      </div>
      <div className='row-info'>
        <div className='row-add'>Объявление</div>
        <div className='row-date'>16.03.2022, 16:16</div>
      </div>
      <div className='row-description'>Примите участие в акселераторе!</div>
    </div>
  );
}

export default RowNotification;
