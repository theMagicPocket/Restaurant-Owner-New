import { FaTrashAlt, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useState } from "react";
import PropTypes from "prop-types";

const FoodItemCard = ({item}) => {
  const [isAvailable, setIsAvailable] = useState(item);

  const toggleAvailability = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to ${isAvailable ? "turn off" : "turn on"} this item?`
    );
    if (confirmed) {
      setIsAvailable(!isAvailable);
    }
    // Call your API to toggle the availability here
  };

  return (
    <div className="relative flex flex-col shadow-lg bg-white rounded-lg p-4 w-full sm:w-48 md:w-full lg:w-72 mb-4">
      <div className="absolute top-2 right-2">
        <button className="p-1 rounded-full hover:bg-gray-200">
          <FaTrashAlt className="text-red-500" />
        </button>
      </div>
      <div className="absolute top-2 left-2">
        <button
          onClick={toggleAvailability}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          {isAvailable ? (
            <FaToggleOn className="text-green-500 text-2xl" />
          ) : (
            <FaToggleOff className="text-red-500 text-2xl" />
          )}
        </button>
      </div>
      <div className="flex justify-center items-center mb-4">
        <img
          src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Dish"
          className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-gray-200"
        />
      </div>
      <div className="text-lg font-semibold text-slate-800 mb-1">
        {item.item_name}
      </div>
      <div className="text-sm text-slate-600 mb-1">
        Description: {item.description}
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-slate-700">
          Price: Rs {item.price}
        </div>
        <div className="text-xs text-green-600">Veg</div>
      </div>
      <div className="text-sm text-slate-600 mb-1">
        Add-on Item: {item.addons}
      </div>
      <div className="text-xs">Add-on Price: Rs 20</div>
    </div>
  );
};
  
FoodItemCard.propTypes = {
  item: PropTypes.shape({
    item_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isAvailable: PropTypes.bool.isRequired,
    addons: PropTypes.string, // Optional
  }).isRequired,
};

export default FoodItemCard;
