import React, { useState } from "react";
import ItemList from "./ItemList";

const ResCategory = ({ data , showItem ,setShowIndex }) => {

  // const [showItem , setShowItem] = useState(false);

  const handleClick = ()=>{
    setShowIndex();
  }


  return (
    <div>
      <div className="w-6/12 mx-auto my-4  bg-gray-50 shadow-lg">
        <div className=" flex  justify-between cursor-pointer " onClick={handleClick}>
          <span className="font-bold text-lg">
            {data.title}({data.itemCards.length})
          </span>
        </div>
        {showItem && <ItemList items={data.itrmdata.Cards} />}
      </div>
    </div>
  );
};

export default ResCategory;
