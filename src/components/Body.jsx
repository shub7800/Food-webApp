import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [restaurantdata, setRestaurantdata] = useState([]);
  const [filteredRestaurant , setFilteredRestaurant]=useState([])
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    // console.log("API response:", json);

    // ✅ Find the card that actually contains the restaurants list
    const restaurantsCard = json?.data?.cards?.find(
      (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    const restaurants =
      restaurantsCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ??
      [];

    // ✅ Always set an array --> prevents `.map` crashing
    setRestaurantdata(restaurants);
  };

  // conditional rendering
  // if(restaurantdata.length===0){
  //   return <Shimmer />;
  // }

  return restaurantdata.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              //filyter the restrant cards and update the ui
              //searchText
              console.log(searchText);
              const filteredRestaurant = restaurantdata.filter((res)=>  
                res.info?.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = restaurantdata.filter(
              (res) => res.info?.avgRating > 4.5
            );
            setRestaurantdata(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>

      <div className="res-container">
        {/* ✅ Extra safety check */}
        {Array.isArray(restaurantdata) &&
          restaurantdata.map((restaurant) => (
            <RestaurantCard key={restaurant?.info?.id} resData={restaurant} />
          ))}
      </div>
    </div>
  );
};

export default Body;
