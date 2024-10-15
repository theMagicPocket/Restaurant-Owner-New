import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setdishData } from "../../app/slices/restaurant/Postdish";
import { usePostDishMutation } from "../../app/Apis/FoodApi";
import Sidenavbar from "../../components/Sidenavbar";

const AddDishForm = () => {
  const dispatch = useDispatch();
  const [postDish] = usePostDishMutation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const [selectedCategories, setSelectedCategories] = useState([]); // State for categories
  const [addonsEnabled, setAddonsEnabled] = useState(false); // If the item can have addons
  const [isAddonItem, setIsAddonItem] = useState(true); // State to check if the item is an addon
  const [selectedAddons, setSelectedAddons] = useState([]); // Selected addons (multiple options)
  const addonOptions = ["Cheese", "Raytha", "Curd", "Milk"];
  const dishdata = useSelector((RootState) => RootState.PostDishdata);

  const categories = [
    "Biryani",
    "Pizza",
    "Burgers",
    "Noodles",
    "Tiffins",
    "Pasta",
    "Desserts",
    "Snacks",
    "Salads",
    "Wraps",
    "BBQ",
    "Seafood",
    "Curries",
    "Soups",
    "Shakes",
  ];

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    if (e.target.checked) {
      const updatedCategories = [...selectedCategories, selectedCategory];
      setSelectedCategories(updatedCategories);
      dispatch(setdishData({ ...dishdata, category: updatedCategories }));
    } else {
      const updatedCategories = selectedCategories.filter(
        (cat) => cat !== selectedCategory
      );
      setSelectedCategories(updatedCategories);
      dispatch(setdishData({ ...dishdata, categories: updatedCategories }));
    }
  };

  const onTextchange = (value, key) => {
    dispatch(setdishData({ ...dishdata, [key]: value }));
  };

  const onvegOptionChange = (value) => {
    dispatch(setdishData({ ...dishdata, is_veg: value === "veg" }));
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // dispatch(setdishData({ ...dishdata, photos: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      console.log(dishdata);
      const response = await postDish(dishdata).unwrap();
      console.log("Dish saved", response);
    } catch (error) {
      console.error("Failed to save the dish:", error);
    }
  };

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleAddonChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedAddons(selectedOptions);
    dispatch(setdishData({ ...dishdata, addons: selectedOptions })); // Dispatch the selected addons as an array
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <button
        onClick={handleToggleSidebar}
        className="md:hidden p-4 text-gray-600 focus:outline-none"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div
        className={` ${isSidebarOpen ? "block" : "hidden"} md:block fixed md:relative z-10 w-full md:w-auto`}
      >
        <Sidenavbar onClose={handleToggleSidebar} />
      </div>

      <div className="flex flex-col pl-4 pr-4 overflow-y-auto flex-grow">
        <div className="mt-8 mb-8 bg-white p-8 rounded-lg shadow-lg w-full">
          <h2 className="text-xl font-semibold mb-4">Add New Dish</h2>
          <form>
            <label className="block mb-4">
              <span className="text-gray-700">Dish Name</span>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={dishdata.item_name}
                onChange={(e) => onTextchange(e.target.value, "item_name")}
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Description</span>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={dishdata.description}
                onChange={(e) => onTextchange(e.target.value, "description")}
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Dish Price</span>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={dishdata.price}
                onChange={(e) => onTextchange(Number(e.target.value), "price")}
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Dish Image</span>
              <input
                type="file"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                onChange={onImageChange}
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Veg / Non-Veg</span>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={dishdata.is_veg ? "veg" : "nonveg"}
                onChange={(e) => onvegOptionChange(e.target.value)}
              >
                <option value="veg">Veg</option>
                <option value="nonveg">Non-Veg</option>
              </select>
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">
                Select all Categories which the food item belongs to
              </span>
              <input
                type="text"
                tabIndex={-1}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50 focus:outline-none focus:ring-0"
                readOnly
                value={selectedCategories.join(", ")}
              />
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <div key={category} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={category}
                      name={category}
                      value={category}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={selectedCategories.includes(category)}
                      onChange={handleCategoryChange}
                    />
                    <label htmlFor={category} className="ml-2 text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Is this item an Addon?</span>
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="isAddonItem"
                    value="yes"
                    checked={isAddonItem === true}
                    onChange={() => {
                      dispatch(setdishData({ ...dishdata, is_addon: true }));
                      setIsAddonItem(true);
                      setAddonsEnabled(false);
                    }}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="isAddonItem"
                    value="no"
                    checked={isAddonItem === false}
                    onChange={() => {
                      console.log(isAddonItem);
                      dispatch(setdishData({ ...dishdata, is_addon: false }));
                      setIsAddonItem(false);
                      setAddonsEnabled(true);
                    }}
                  />
                  No
                </label>
              </div>
            </label>

            {addonsEnabled && (
              <label className="block mb-4">
                <span className="text-gray-700">Select Addons</span>
                <select
                  className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={selectedAddons}
                  onChange={handleAddonChange}
                  multiple // Enable multiple selections
                >
                  {addonOptions.map((addon) => (
                    <option key={addon} value={addon}>
                      {addon}
                    </option>
                  ))}
                </select>
                {selectedAddons.length > 0 && (
                  <div className="mt-2">
                    <span className="text-gray-700">
                      Selected Addons: {selectedAddons.join(", ")}
                    </span>
                  </div>
                )}
              </label>
            )}

            <button
              type="button"
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500"
              onClick={handleSave}
            >
              Save Dish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDishForm;
