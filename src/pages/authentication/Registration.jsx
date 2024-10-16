import { useState } from "react";
// import { usePostHotelMutation } from "../../app/Apis/RegisterApi";
import { usePostHotelMutation } from "../../app/Apis/RegisterApi";
import { useDispatch } from "react-redux";
import { FaChevronDown } from "react-icons/fa"; 
import app from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { setRegisterData } from "../../app/slices/restaurant/registerSlice";
import {
  setRestaurantId,
  setIsRegistered,
  setIsverified,
} from "../../app/slices/authentication/authSlice";
import { TailSpin } from "react-loader-spinner";
// import axiosInstance from "../../axiosInstance";

const Registration = () => {
  const dispatch = useDispatch();
  const storage = getStorage(app);
  const navigate = useNavigate();
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errors, setErrors] = useState({});
  const categories = ["Veg", "Non-Veg"];
  const [loading, setLoading] = useState(false);
  const [postHotel] = usePostHotelMutation();
  const registerData = useSelector((state) => state.register);
  // const token = useSelector((state) => state.auth.token);

  const onTextchange = (value, key) => {
    if (key.includes(".")) {
      console.log(key);
      // Split the key to access nested fields (e.g., "address.street")
      const keys = key.split(".");
      dispatch(
        setRegisterData({
          ...registerData,
          [keys[0]]: {
            ...registerData[keys[0]], // Keep the rest of the address object intact
            [keys[1]]: value, // Update the nested field (e.g., street)
          },
        })
      );
    } else {
      // For non-nested fields, update directly
      dispatch(setRegisterData({ ...registerData, [key]: value }));
    }
  };

  const handleImageChange = (e) => {
    setRestaurantImage(e.target.files[0]);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!registerData.name)
      newErrors.restaurantName = "Restaurant Name is required.";
    if (!registerData.address.street)
      newErrors.address = "Address is required.";
    if (!registerData.address.door_no)
      newErrors.doorno = "Door Number is required.";
    if (!registerData.address.city) newErrors.city = "City is required.";
    if (!registerData.address.state) newErrors.state = "State is required.";
    if (!registerData.address.pincode)
      newErrors.zipcode = "Zipcode is required.";
    if (!registerData.opens_at)
      newErrors.openingHours = "Opening Hours are required.";
    if (!registerData.closes_at)
      newErrors.closingHours = "Closing Hours are required.";
    // if (registerData.is_veg === null)
    //   newErrors.selectedCategory = "Please select a category.";
    if (!restaurantImage)
      newErrors.restaurantImage = "Restaurant Image is required."; // Add this line
    // if (!registerData.photo)
    //   newErrors.restaurantImage = "Restaurant Image is required."; // Add this line
    return newErrors;
  };

  // try {
  //   console.log(registerData)
  //   const response = await postHotel(registerData).unwrap();
  //   console.log("Dish saved", response);
  //   // dispatch(setRestaurantId(response.data));
  //   // dispatch(setIsRegistered(true));
  //   navigate("/success");
  // } catch (error) {
  //   console.error("Error creating hotelll:", error);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set loading to true initially
    // dispatch(setLoading(true));
    setLoading(true);
    try {
      let imageUrl = "";
      console.log(restaurantImage);
      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        // dispatch(setLoading(false));  // Stop loading on validation error
        return;
      }
      // Step 1: Upload image if it exists
      if (restaurantImage) {
        const storageRef = ref(storage, `restaurants/${restaurantImage.name}`);
        const snapshot = await uploadBytes(storageRef, restaurantImage);
        imageUrl = await getDownloadURL(snapshot.ref);
        console.log("Image uploaded:", imageUrl);
      }

      // Step 2: Update the register data with the image URL
      const updatedRegisterData = {
        ...registerData,
        photo: imageUrl, // Add image URL to register data
      };

      // Step 3: Dispatch the updated register data
      dispatch(setRegisterData(updatedRegisterData));

      // Step 4: Submit the form data with the image URL
      console.log("Submitting data:", updatedRegisterData);
      // axiosInstance
      //   .post("/v1/hotels", updatedRegisterData, {
      //     headers: {
      //       token: token, // Set the Authorization header
      //     },
      //   })
      //   .then((response) => {
      //     console.log("Hotel added successfully:", response.data);
      //     // dispatch(setRestaurantId(response.data.data));
      //     // dispatch(setIsRegistered(true));
      //     // navigate("/success");
      //     dispatch(setRestaurantId(response.data.data)); // Dispatch Redux actions
      //     dispatch(setIsRegistered(true));
      //     dispatch(setIsverified(false))
      //     navigate("/success");
      //   })
      //   .catch((error) => {
      //     console.error("Error adding the hotel:", error);
      //   });
      // Unwrap to handle the promise state (successful or failed)
      const response = await postHotel(updatedRegisterData).unwrap();
      console.log("Hotel added successfully:", response);
      dispatch(setRestaurantId(response.data.data)); // Dispatch Redux actions
      dispatch(setIsRegistered(true));
      dispatch(setIsverified(false)) 
      navigate("/success");
    } catch (error) {
      console.error("Error creating hotel:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-full">
        <h1 className="my-8 mx-5 text-4xl text-slate-700">
          Restaurant Information
        </h1>
        <div className="p-6 bg-gray-100 flex items-start justify-start">
          <div className="max-w-screen-lg mx-auto">
            <div>
              <h2 className="font-semibold text-xl text-gray-600 pb-2">
                Restaurant details
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                    <div className="lg:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <InputField
                          label="Restaurant Name"
                          type="text"
                          name="restaurant_name"
                          id="restaurant_name"
                          placeholder="Restaurant Name"
                          value={registerData.name || ""}
                          onChange={(e) => onTextchange(e.target.value, "name")}
                          error={errors.restaurantName}
                        />

                        <InputField
                          label="Address / Street"
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Enter Full Address"
                          onChange={(e) =>
                            onTextchange(e.target.value, "address.street")
                          }
                          value={registerData.address.street || ""}
                          error={errors.address}
                        />

                        <InputField
                          label="Door Number"
                          type="text"
                          name="doorno"
                          id="doorno"
                          placeholder="Door Number"
                          onChange={(e) =>
                            onTextchange(e.target.value, "address.door_no")
                          }
                          value={registerData.address.door_no || ""}
                          error={errors.doorno}
                        />

                        <InputField
                          label="City"
                          type="text"
                          name="city"
                          id="city"
                          placeholder="City"
                          onChange={(e) =>
                            onTextchange(e.target.value, "address.city")
                          }
                          value={registerData.address.city || ""}
                          error={errors.city}
                        />

                        <InputField
                          label="State / Province"
                          type="text"
                          name="state"
                          id="state"
                          placeholder="State"
                          onChange={(e) =>
                            onTextchange(e.target.value, "address.state")
                          }
                          value={registerData.address.state || ""}
                          error={errors.state}
                        />

                        <InputField
                          label="Zipcode"
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          placeholder="Zipcode"
                          onChange={(e) =>
                            onTextchange(e.target.value, "address.pincode")
                          }
                          value={registerData.address.pincode || ""}
                          error={errors.zipcode}
                        />

                        <TimeField
                          label="Opening Hours"
                          name="opening-hours"
                          id="opening-hours"
                          onChange={(e) =>
                            onTextchange(e.target.value, "opens_at")
                          }
                          value={registerData.opens_at || ""}
                          error={errors.openingHours}
                        />

                        <TimeField
                          label="Closing Hours"
                          name="closing-hours"
                          id="closing-hours"
                          onChange={(e) =>
                            onTextchange(e.target.value, "closes_at")
                          }
                          value={registerData.closes_at || ""}
                          error={errors.closingHours}
                        />

                        <ImageUpload
                          label="Upload Restaurant Image"
                          id="restaurant_image"
                          onChange={handleImageChange}
                          // value={}
                          error={errors.restaurantImage}
                        />

                        <div className="md:col-span-5">
                          <label htmlFor="categories">Category</label>
                          <div className="relative mt-1">
                            <div
                              className="flex items-center h-10 border rounded px-4 w-full bg-gray-50 cursor-pointer"
                              onClick={() => setShowDropdown(!showDropdown)}
                            >
                              <input
                                type="text"
                                name="categories"
                                id="categories"
                                className="flex-grow bg-transparent focus:outline-none"
                                value={registerData.is_veg ? "Veg" : "Non-Veg"}
                                placeholder="Select Category"
                                readOnly
                              />
                              <FaChevronDown className="text-gray-600 ml-2" />
                            </div>
                            {errors.selectedCategory && (
                              <p className="text-red-600 text-sm">
                                {errors.selectedCategory}
                              </p>
                            )}

                            {showDropdown && (
                              <div className="absolute z-10 mt-1 bg-white border rounded shadow-lg w-full">
                                <ul className="max-h-48 overflow-auto p-2">
                                  {categories.map((category, index) => (
                                    <li
                                      key={index}
                                      className="p-2 cursor-pointer hover:bg-gray-100"
                                      onClick={() => {
                                        dispatch(
                                          setRegisterData({
                                            ...registerData,
                                            is_veg:
                                              category === "Veg" ? true : false,
                                          })
                                        );
                                        handleCategoryChange(category);
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        id={category}
                                        name="category"
                                        value={category}
                                        checked={selectedCategory === category}
                                        onChange={() =>
                                          handleCategoryChange(category)
                                        }
                                        className="mr-2"
                                      />
                                      <label
                                        htmlFor={category}
                                        className="text-gray-700"
                                      >
                                        {category}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="md:col-span-5 text-right">
                          <div className="inline-flex items-end">
                            <button
                              type="submit"
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              disabled={loading}
                            >
                              {loading ? (
                                <TailSpin
                                  height="20"
                                  width="20"
                                  color="#fff"
                                  ariaLabel="loading"
                                  className="mr-2"
                                />
                              ) : (
                                "Submit"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// InputField Component with error handling
const InputField = ({
  label,
  type,
  name,
  id,
  placeholder,
  onChange,
  value,
  error,
}) => (
  <div className="md:col-span-5">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${error ? "border-red-500" : "border-gray-300"}`}
      onChange={onChange}
      placeholder={placeholder}
    />
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string, // Error prop for error message
};

// ImageUpload Component with error handling
const ImageUpload = ({ label, id, onChange, error }) => (
  <div className="md:col-span-5">
    <label htmlFor={id}>{label}</label>
    <input
      type="file"
      name={id}
      id={id}
      className={`h-10 border mt-1 rounded p-2 w-full bg-gray-50 ${error ? "border-red-500" : "border-gray-300"}`}
      onChange={onChange}
    />
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);

ImageUpload.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string, // Error prop for error message
};

// TimeField Component with error handling
const TimeField = ({ label, id, name, onChange, value, error }) => (
  <div className="md:col-span-5">
    <label htmlFor={id}>{label}</label>
    <input
      type="time"
      name={name}
      id={id}
      className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${error ? "border-red-500" : "border-gray-300"}`}
      onChange={onChange}
      value={value}
    />
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);

TimeField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string, // Error prop for error message
  value: PropTypes.string,
};

export default Registration;
