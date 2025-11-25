import RestaurantCard, { withIsOpenLabel } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [restaurantdata, setRestaurantdata] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardIsOpen = withIsOpenLabel(RestaurantCard);

  console.log(restaurantdata);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    // ✅ Find the card that actually contains the restaurants list
    const restaurantsCard = json?.data?.cards?.find(
      (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    const restaurants =
      restaurantsCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ??
      [];

    // ✅ Always set an array --> prevents `.map` crashing
    setRestaurantdata(restaurants);
    setFilteredRestaurant(restaurants);
  };

  const OnlineStatus = useOnlineStatus();

  if (OnlineStatus === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-6xl mb-4">📡</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            You're Offline
          </h1>
          <p className="text-gray-600">Please check your internet connection</p>
        </div>
      </div>
    );
  }

  return restaurantdata.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                className="flex-1 md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Search for restaurants..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <button
                className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 active:scale-95 transition-all duration-200 shadow-md whitespace-nowrap"
                onClick={() => {
                  const filteredRestaurant = restaurantdata.filter((res) =>
                    res.info?.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  );
                  setFilteredRestaurant(filteredRestaurant);
                }}
              >
                Search
              </button>
            </div>

            {/* Top Rated Button */}
            <button
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 active:scale-95 transition-all duration-200 shadow-md whitespace-nowrap w-full md:w-auto"
              onClick={() => {
                const filteredList = restaurantdata.filter(
                  (res) => res.info?.avgRating > 4.5
                );
                setFilteredRestaurant(filteredList);
              }}
            >
              ⭐ Top Rated Restaurant
            </button>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600 text-sm">
            Showing {filteredRestaurant.length} restaurant
            {filteredRestaurant.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/***if the restaurat isOpen so add label isOpen */}
          {Array.isArray(filteredRestaurant) &&
            filteredRestaurant.map((restaurant) =>
              restaurant?.info?.isOpen ? (
                <RestaurantCardIsOpen
                  key={restaurant?.info?.id}
                  resData={restaurant}
                />
              ) : (
                <RestaurantCard
                  key={restaurant?.info?.id}
                  resData={restaurant}
                />
              )
            )}
        </div>

        {/* No Results Message */}
        {filteredRestaurant.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No restaurants found
            </h2>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
