import React from "react";
import "./CardNews.css";

function Card({ icon, name }) {
  return (
    <div className='card-header'>
      <div className='card-icon'>
        <img src={`images/icons/${icon}`} alt='icon' />
      </div>
      <div className='card-name'>
        <p>{name}</p>
      </div>
    </div>
  );
}

export default Card;
