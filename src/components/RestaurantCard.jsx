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
  } = resData?.info;

  // Safety: never let undefined/NaN hit the DOM text nodes
  const cuisinesText = Array.isArray(cuisines) ? cuisines.join(", ") : "";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2">
      {/* Restaurant Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          alt={name}
          src={`${CDN_URL}${cloudinaryImageId}`}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Rating Badge */}
        {Number.isFinite(avgRating) && avgRating > 0 && (
          <div className="absolute bottom-3 left-3 bg-green-600 text-white px-3 py-1 rounded-lg font-semibold text-sm flex items-center gap-1 shadow-lg">
            <span>⭐</span>
            <span>{avgRating}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Restaurant Name */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
          {String(name)}
        </h3>

        {/* Cuisines */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">
          {cuisinesText}
        </p>

        {/* Info Grid */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          {/* Cost */}
          <div className="flex items-center gap-1 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">{costForTwo ?? "N/A"}</span>
          </div>

          {/* Delivery Time */}
          {Number.isFinite(deliveryTime) && (
            <div className="flex items-center gap-1 text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">{deliveryTime} mins</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

//higher order component it takes restaurant card as input and give enhance version of restaurant card 
export const withIsOpenLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        {/* Open Label */}
        <label className="absolute top-0 left-0 z-10 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-br-lg shadow-lg">
          OPEN
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;