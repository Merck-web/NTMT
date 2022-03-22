import React from "react";
import "./CardNews.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Card({ icon, name, match, history, location, route }) {
  // console.log(match);
  // console.log(history);
  // console.log(location);
  return (
    <Router>
      <Link to={`${route}`} className='card'>
        <div className='card-header'>
          <div className='card-icon'>
            <img src={`images/icons/${icon}`} alt='icon' />
          </div>
          <div className='card-name'>
            <p>{name}</p>
          </div>
        </div>
      </Link>
    </Router>
  );
}

export default Card;
