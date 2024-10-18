
import { FaTrashAlt, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useState} from "react";
import PropTypes from "prop-types";


const FoodItemCard = ({ item, addons }) => {
  const [isAvailable, setIsAvailable] = useState(item.is_active);
  const toggleAvailability = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to ${isAvailable ? "turn off" : "turn on"} this item?`
    );
    if (confirmed) {
      setIsAvailable(!isAvailable);
    }
  };

  return (
    // w-full sm:w-60 md:w-72 lg:w-80 mb-4
    <div className="flex flex-col shadow-md bg-white rounded-lg p-4  relative hover:shadow-lg transition-all">
      {/* Top Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button className="p-1 hover:bg-gray-200 rounded-full">
          <FaTrashAlt className="text-red-500" />
        </button>
        <button
          onClick={toggleAvailability}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          {isAvailable ? (
            <FaToggleOn className="text-green-500 text-2xl" />
          ) : (
            <FaToggleOff className="text-red-500 text-2xl" />
          )}
        </button>
      </div>

      {/* Image and Info Section */}
      <div className="flex items-center justify-center mb-4">
        <img
          // src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
          src={item.photo}
          alt={item.item_name}
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
        />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {item.item_name}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        
        {!item.is_addon && (<p className="text-sm text-gray-600 mt-1">
          Category: {item.category.join(", ")}
        </p>)}
      </div>

      {/* Price and Veg/Non-Veg */}
      <div className="flex justify-between mt-2 px-2">
        <span className="text-sm font-medium text-gray-700">
          Price: Rs {item.price}
        </span>
        <span
          className={`text-xs font-semibold ${item.is_veg ? "text-green-600" : "text-red-600"}`}
        >
          {item.is_veg ? "Veg" : "Non-Veg"}
        </span>
      </div>

      {/* Add-on Details (Collapsible) */}
      {addons.length > 0 && (
        <details className="mt-3 cursor-pointer">
          <summary className="text-sm font-semibold text-gray-700 mb-1">
            Add-ons ({addons.length}):
          </summary>
          <ul className="grid grid-cols-2 gap-2 mt-2">
            {addons.map((addon, index) => (
              <li
                key={index}
                className="bg-gray-50 p-2 rounded shadow-sm border"
              >
                <div className="text-xs font-medium text-gray-800">
                  {addon.item_name}
                </div>
                <div className="text-xs text-gray-600">
                  Price: Rs {addon.price}
                </div>
                <div
                  className={`text-xs ${addon.is_veg ? "text-green-500" : "text-red-500"}`}
                >
                  {addon.is_veg ? "Veg" : "Non-Veg"}
                </div>
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* Rating Section */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Avg. Rating: {item.avg_rating} ({item.no_of_ratings} ratings)
        </p>
      </div>
    </div>
  );
};

FoodItemCard.propTypes = {
  item: PropTypes.shape({
    item_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    photo: PropTypes.string.isRequired,
    is_veg: PropTypes.bool.isRequired,
    is_addon: PropTypes.bool.isRequired,
    category: PropTypes.arrayOf(PropTypes.string).isRequired,
    avg_rating: PropTypes.number,
    no_of_ratings: PropTypes.number,
    is_active: PropTypes.bool.isRequired,
    addons: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  addons: PropTypes.arrayOf(
    // Define the structure for each addon
    PropTypes.shape({
      item_name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      is_veg: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default FoodItemCard;

