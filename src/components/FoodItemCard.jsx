
import { FaTrashAlt, FaToggleOn, FaToggleOff, FaEdit } from "react-icons/fa";
import { useState} from "react";
import PropTypes from "prop-types";
import { useDeleteFoodItemMutation } from "../app/Apis/FoodApi";
import Snackbar from "./Snackbar";
import { useNavigate } from "react-router-dom";
import { useUpdateFoodItemMutation } from "../app/Apis/FoodApi";

const FoodItemCard = ({ item, addons }) => {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(item.is_active);
  const [deletefooditem] = useDeleteFoodItemMutation();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success"); 
  const [updateDish, { isLoading: isUpdating }] = useUpdateFoodItemMutation();

  const toggleAvailability = async (foodItemId, currentStatus) => {
    const confirmed = window.confirm(
      `Are you sure you want to ${currentStatus ? "turn off" : "turn on"} this item?`
    );

    if (!confirmed) return; // Exit if the user doesn't confirm
    console.log("this check")
    // console.log(itemId)
    console.log(currentStatus)
    try {
      await updateDish({
        foodItemId,
        data: { is_active: !currentStatus },
      }).unwrap();
      setIsAvailable(!currentStatus); // Update state only if API call succeeds
      setSnackbarMessage("Food Item status updated successfully.");
      setSnackbarType("success");
    } catch (error) {
      setSnackbarMessage("Failed to update item availability, please try again.");
      setSnackbarType("error");
      console.error("Failed to update item availability:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    console.log(item)
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this food item from menu?"
    );
    if (!isConfirmed) return;
    try {
      await deletefooditem(itemId).unwrap();
      setSnackbarMessage("Food Item deleted successfully");
      setSnackbarType("success");
    } catch (error) {
      setSnackbarMessage("Failed to delete food item, please try again.");
      setSnackbarType("error");
      console.log(error);
    }
  };
  const handleEditClick = () => {
    console.log("checking")
    console.log(item)
    console.log(addons)
   navigate(`/edit/${item.id}`, { state: { item, addons } });// Navigate to edit route with item ID
  };

  return (
    // w-full sm:w-60 md:w-72 lg:w-80 mb-4
    <div className="flex flex-col shadow-md bg-white rounded-lg p-4  relative hover:shadow-lg transition-all">
      {/* Top Action Buttons */}
      <Snackbar
        message={snackbarMessage}
        type={snackbarType}
        onClose={() => setSnackbarMessage("")} // Clear message on close
      />
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          className="p-1 hover:bg-gray-200 rounded-full"
          onClick={() => handleDeleteItem(item.id)}
        >
          <FaTrashAlt className="text-red-500" />
        </button>
        <button
          className="p-1 hover:bg-gray-200 rounded-full"
          onClick={handleEditClick}
        >
          <FaEdit className="text-blue-500" />
        </button>
        <button
          onClick={() => toggleAvailability(item.id, isAvailable)}
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

        {!item.is_addon && (
          <p className="text-sm text-gray-600 mt-1">
            Category: {item.category.join(", ")}
          </p>
        )}
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
    id: PropTypes.string.isRequired,
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

