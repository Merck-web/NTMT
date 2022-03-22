import React from "react";
import Card from "./Card";
import cards from "./json";
import "./CardNews.css";

function CardNews() {
  return (
    <>
      <div className='cards'>
        {cards.map((item) => (
          <Card key={item.name} icon={item.icon} name={item.name} />
        ))}
      </div>
    </>
  );
}

export default CardNews;
