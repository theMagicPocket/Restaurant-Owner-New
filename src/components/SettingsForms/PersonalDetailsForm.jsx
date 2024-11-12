import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useUpdateHotelMutation } from "../../app/Apis/RegisterApi";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import app from "../../firebase";

const PersonalDetailsForm = () => {
  const {
    user_email,
    restaurant_id,
    image_url,
    opens_at,
    closes_at,
    restaurant_name,
  } = useSelector((state) => state.auth);

  const [profileData, setProfileData] = useState({
    email: user_email,
    restaurantName: restaurant_name,
    imageUrl: image_url,
    opensAt: opens_at,
    closesAt: closes_at,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [updateHotel] = useUpdateHotelMutation();
  const [editingImage, setEditingImage] = useState(false);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };
  const storage = getStorage(app);

  // Handle image file change and upload to Firebase
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        // Define Firebase storage reference
        const imageRef = ref(storage, `profileImages/${file.name}`);
        await uploadBytes(imageRef, file); // Upload the file
        const uploadedUrl = await getDownloadURL(imageRef); // Get the file's URL

        // Update profileData with the new image URL
        setProfileData({ ...profileData, imageUrl: uploadedUrl });
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
        setEditingImage(false); // Hide file input after upload
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { email, ...updateData } = profileData; // Exclude email from update
    // console.log(updateData);
    const updateData = {
      opens_at: profileData.opensAt.replace(":", ""),
      closes_at: profileData.closesAt.replace(":", ""),
      name: profileData.restaurantName,
      photo: profileData.imageUrl,
    };
    await updateHotel({ hotelId: restaurant_id, data: updateData });
    console.log("Personal Details Updated:", updateData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
      <div className="grid grid-cols-1 gap-4">
        {/* Email (Read-Only) */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={profileData.email}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 text-gray-600 cursor-not-allowed"
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

        {/* Restaurant Image */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Restaurant Image
          </label>
          <div className="flex items-center space-x-4">
            <img
              src={profileData.imageUrl}
              alt="Restaurant"
              className="w-16 h-16 rounded-lg border border-gray-300 object-cover"
            />
            {!editingImage ? (
              <button
                type="button"
                onClick={() => setEditingImage(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                Change Image
              </button>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            )}
          </div>
          {isUploading && <p className="text-blue-500 mt-2">Uploading...</p>}
        </div>

        {/* Restaurant Opens At */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Restaurant Opens At
          </label>
          <input
            type="time"
            name="opensAt"
            value={profileData.opensAt}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Restaurant Closes At */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Restaurant Closes At
          </label>
          <input
            type="time"
            name="closesAt"
            value={profileData.closesAt}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
          disabled={isUploading}
        >
          {isUploading ? "Saving..." : "Save Personal Details"}
        </button>
      </div>
    </form>
  );
};

PersonalDetailsForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default PersonalDetailsForm;
