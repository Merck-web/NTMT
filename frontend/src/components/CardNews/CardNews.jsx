import React from "react";
import Card from "./Card";
import cards from "./json";
import "./CardNews.css";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

function CardNews() {
  const location = useLocation();
  const query = queryString.parse(location);
  console.log(query);
  const menuCards = (e) => {
    // const menuCards = document.querySelectorAll("card");
    // if (
    //   e.target.classList.contains("card") &&
    //   !e.target.classList.contains("active")
    // ) {
    //   menuCards.classList.remove("active");
    //   let target = document.querySelector.e.target.classList.contains("active");
    //   target.classList.add("active");
    // }
  };
  return (
    <>
      <div onClick={menuCards} className='cards '>
        {cards.map((item) => (
          <Link to={`${item.route}`} key={item.name} className='card'>
            <Card icon={item.icon} name={item.name} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default CardNews;
