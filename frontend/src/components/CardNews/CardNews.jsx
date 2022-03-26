import React, { useState } from "react";
import Card from "./Card";
import cards from "./json";
import "./CardNews.css";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

function CardNews() {
  const location = useLocation();
  const query = queryString.parse(location);
  const [activeCard, setActiveCard] = useState(window.location.pathname.substring(1));
  console.log(activeCard)
  console.log(window.location.pathname)
  // console.log(query);
  const menuCards = (e) => {};
  return (
    <>
      <div onClick={menuCards} className="cards ">
        {cards.map(item => (
          <Link
            to={`${item.route}`}
            onClick={() => setActiveCard(item.route)}
            key={item.name}
            className={`card ${activeCard === item.route && "active"}`}
          >
            <Card item={item} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default CardNews;
