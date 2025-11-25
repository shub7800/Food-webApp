import React from "react";
import { CDN_URL } from "../utils/constants";

const ItemList = ({ item }) => {
  return (
    <div>
      {item.map((item) => {
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between "
        >
          <div className="p-2">
            <span>{item.card.card.name}</span>
            <span>
              {item.card.card.price
                ? item.card.card.price / 100
                : item.card.card.defaultPrice / 100}
            </span>
          </div>
          <p className="text-xs">{item.card.card.description}</p>
          <div>
            <img
              src={CDN_URL + item.card.card.imageId}
              className="w-20 h-auto"
            />
            <button className="mx-16 p-2 rounded-lg bg-white shadow-lg absolute ">Add</button>
          </div>
        </div>;
      })}
    </div>
  );
};

export default ItemList;
