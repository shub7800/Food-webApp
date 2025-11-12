import { useEffect } from "react";

const RestaurantMenu = () => {
  useEffect(() => {
    fetchMenu();
  }, []);

 const fetchMenu = async () => {
  try {
    const response = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.57590&lng=77.33450&restaurantId=237332&catalog_qa=undefined&submitAction=ENTER"
    );

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Try to parse JSON safely
    const text = await response.text();
    const json = text ? JSON.parse(text) : {};
    console.log("json",json);

  } catch (error) {
    console.error("Error fetching or parsing menu:", error);
  }
};


  return (
    <div>
      <h1>Name of the Restaurant</h1>
      <h2>Menu</h2>
      <ul>
        <li>Briyani</li>
        <li>burger</li>
        <li>diet coke</li>
      </ul>
    </div>
  );
};

export default RestaurantMenu;
