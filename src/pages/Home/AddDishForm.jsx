import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setdishData } from "../../app/slices/restaurant/Postdish";
import { usePostDishMutation } from "../../app/Apis/FoodApi";
import Sidenavbar from "../../components/Sidenavbar";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import app from "../../firebase";
import Snackbar from "../../components/Snackbar";
import { useGetFoodItemsQuery } from "../../app/Apis/FoodApi";
import { useRef } from "react";

const AddDishForm = () => {
  const dispatch = useDispatch();
  const [postDish] = usePostDishMutation();
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const [selectedCategories, setSelectedCategories] = useState([]); // State for categories
  const [addonsEnabled, setAddonsEnabled] = useState(true); // If the item can have addons
  const [isAddonItem, setIsAddonItem] = useState(false); // State to check if the item is an addon
  const [selectedAddons, setSelectedAddons] = useState([]); // Selected addons (multiple options)
  const { data: foodItems } = useGetFoodItemsQuery();
  const dishdata = useSelector((RootState) => RootState.PostDishdata);
  const [errors, setErrors] = useState({});
  const storage = getStorage(app);
  const restaurant_id = useSelector((state) => state.auth.restaurant_id);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const fileInputRef = useRef(null);

  const categories = [
    "Biriyani",
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
    "Others",
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setErrors({
          ...errors,
          photos: "Please upload a valid image (JPG/PNG).",
        });
        return;
      }
      setRestaurantImage(file);
      // Clear any previous image errors
      setErrors({ ...errors, photos: "" });
    } else {
      setErrors({ ...errors, photos: "Restaurant image is required." });
    }
  };

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // const handleAddonChange = (e) => {
  //   const selectedOptions = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   setSelectedAddons(selectedOptions);
  //   dispatch(setdishData({ ...dishdata, addons: selectedOptions })); // Dispatch the selected addons as an array
  // };
  const handleAddonCheckboxChange = (e, addonId) => {
    let updatedAddons;

    if (e.target.checked) {
      // Add the selected addon if it's checked
      updatedAddons = [...selectedAddons, addonId];
    } else {
      // Remove the addon if it's unchecked
      updatedAddons = selectedAddons.filter((id) => id !== addonId);
    }

    // Update the selected addons in state
    setSelectedAddons(updatedAddons);

    // Dispatch the updated addons to the store
    dispatch(setdishData({ ...dishdata, addons: updatedAddons }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!dishdata.item_name) newErrors.item_name = "Dish Name is required.";
    if (!dishdata.description)
      newErrors.description = "Description is required.";
    if (!dishdata.price) newErrors.price = "Price is required.";
    if (!restaurantImage) newErrors.photos = "Restaurant Image is required.";
    if (isAddonItem === false && selectedCategories.length === 0)
      newErrors.category = "At least one category must be selected.";
    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    try {
      if (!validateForm()) return;

      let imageUrl = "";
      if (restaurantImage) {
        const storageRef = ref(storage, `Menu/${restaurantImage.name}`);
        const snapshot = await uploadBytes(storageRef, restaurantImage);
        imageUrl = await getDownloadURL(snapshot.ref);
        console.log("Image uploaded:", imageUrl);
      }

      const categoryData = isAddonItem ? ["Others"] : selectedCategories;

      const updatedDishData = {
        ...dishdata,
        photo: imageUrl, // Add image URL to register data
        hotel_id: restaurant_id,
        category: categoryData,
      };
      console.log(restaurant_id);
      console.log("dish data");
      console.log(updatedDishData);
      // Uncomment the following to actually post the dish
      const response = await postDish(updatedDishData).unwrap();
      console.log("Dish saved", response);
      dispatch(
        setdishData({
          item_name: "",
          description: "",
          hotel_id: "",
          price: "",
          addons: [],
          photo: "",
          is_veg: false,
          is_addon: true,
          is_active: true,
          category: [],
        })
      );
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input
      }
      setIsAddonItem(true);
      setRestaurantImage(null); // Reset the image file
      setSelectedCategories([]); // Reset selected categories
      setAddonsEnabled(false); // Reset addon state if needed
      setSelectedAddons([]); // Reset selected addons
      setSnackbarMessage("Menu item added successfully.");
      setSnackbarType("success");
    } catch (error) {
      console.log(error);
      dispatch(
        setdishData({
          item_name: "",
          description: "",
          hotel_id: "",
          price: "",
          addons: [],
          photo: "",
          is_veg: false,
          is_addon: true,
          is_active: true,
          category: [],
        })
      );
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input
      }
      setIsAddonItem(true);
      setRestaurantImage(null); // Reset the image file
      setSelectedCategories([]); // Reset selected categories
      setAddonsEnabled(false); // Reset addon state if needed
      setSelectedAddons([]); // Reset selected addons
      setSnackbarMessage("Something went wrong. Please try again");
      setSnackbarType("error");
      console.error("Failed to save the dish:", error);
    }
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

      <Snackbar
        message={snackbarMessage}
        type={snackbarType}
        onClose={() => setSnackbarMessage("")} // Clear message on close
      />

      <div className="flex flex-col pl-4 pr-4 overflow-y-auto flex-grow">
        <div className="mt-8 mb-8 bg-white p-8 rounded-lg shadow-lg w-full">
          <h2 className="text-xl font-semibold mb-4">Add New Dish</h2>
          <form>
            <label className="block mb-4">
              <span className="text-gray-700">Is this item an Addon?</span>
              <div className="flex items-center mt-2">
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
                    className="mr-1"
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
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Dish Name</span>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={dishdata.item_name}
                onChange={(e) => onTextchange(e.target.value, "item_name")}
              />
              {errors.item_name && (
                <p className="text-red-600">{errors.item_name}</p>
              )}
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Description</span>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={dishdata.description}
                onChange={(e) => onTextchange(e.target.value, "description")}
              />
              {errors.description && (
                <p className="text-red-600">{errors.description}</p>
              )}
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Dish Price</span>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={dishdata.price}
                onChange={(e) => onTextchange(Number(e.target.value), "price")}
              />
              {errors.price && <p className="text-red-600">{errors.price}</p>}
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Dish Image</span>
              <input
                type="file"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              {errors.photos && <p className="text-red-600">{errors.photos}</p>}
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
              {errors.is_veg && <p className="text-red-600">{errors.is_veg}</p>}
            </label>

            {addonsEnabled && (
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
                {errors.category && (
                  <p className="text-red-600">{errors.category}</p>
                )}
              </label>
            )}

            {addonsEnabled && (
              <div className="block mb-4">
                <span className="text-gray-700">Select Addons</span>
                <div className="block w-full border border-gray-300 rounded-md shadow-sm p-2 h-48 overflow-auto mt-2">
                  {foodItems?.data
                    .filter((item) => item.is_addon) // Filter to get only addons
                    .map((addon) => (
                      <div key={addon.id} className="mb-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            value={addon.id}
                            checked={selectedAddons.includes(addon.id)}
                            onChange={(e) =>
                              handleAddonCheckboxChange(e, addon.id)
                            }
                            className="form-checkbox h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2">
                            <span className="text-md">
                              {addon.item_name}
                            </span>{" "}
                            {/* Bold and larger text for the item name */}
                            <span className="text-sm text-gray-500">
                              - {addon.description}
                            </span>{" "}
                            {/* Smaller, gray text for the description */}
                            <span className="text-base font-semibold text-blue-500">
                              - Rs {addon.price}
                            </span>
                            {/* Green and slightly larger font for the price */}
                            <span
                              className={`ml-2 text-xs font-medium ${
                                addon.is_veg ? "text-green-500" : "text-red-500"
                              }`}
                            >
                              ({addon.is_veg ? "Veg" : "Non-Veg"})
                            </span>
                            {/* Green for veg and red for non-veg */}
                          </span>
                        </label>
                      </div>
                    ))}
                </div>
                {errors.addons && (
                  <p className="text-red-600">{errors.addons}</p>
                )}
              </div>
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
