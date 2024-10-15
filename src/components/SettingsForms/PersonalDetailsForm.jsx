import { useState } from "react";
import PropTypes from "prop-types";

const PersonalDetailsForm = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    restaurantName: "",
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Personal Details Submitted:", profileData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
          />
        </div>

        {/* Restaurant Name */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Restaurant Name
          </label>
          <input
            type="text"
            name="restaurantName"
            value={profileData.restaurantName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Restaurant Name"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
        >
          Save Personal Details
        </button>
      </div>
    </form>
  );
};

PersonalDetailsForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default PersonalDetailsForm;
