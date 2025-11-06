import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  // Accept the WHOLE restaurant or just .info — support both safely
  // const info = resData?.info ?? resData ?? {};
  const {
    name,
    cuisines,
    // keep numbers as numbers; rendering numbers is fine
    avgRating,
    costForTwo,
    deliveryTime,
    cloudinaryImageId,
  } = resData?.info ;

  // Safety: never let undefined/NaN hit the DOM text nodes
  const cuisinesText = Array.isArray(cuisines) ? cuisines.join(", ") : "";

  return (
    <div className="res-card" style={{ backgroundColor: "#f0f0f0" }}>
      <img
        className="res-logo"
        alt={name}
        src={`${CDN_URL}${cloudinaryImageId}`}
      />
      <h3>{String(name)}</h3>
      <h4>{cuisinesText}</h4>
      <h4>{Number.isFinite(avgRating) ? `${avgRating} ⭐` : ""}</h4>
      <h4>{costForTwo   ?? ""}</h4>
      <h4>{Number.isFinite(deliveryTime) ? `${deliveryTime} minutes` : ""}</h4>
    </div>
  );
};

export default RestaurantCard;
