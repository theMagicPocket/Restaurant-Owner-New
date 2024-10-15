import { useState, useEffect } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import Sidenavbar from "../../components/Sidenavbar";

const Settings = () => {
  // State for form fields
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantStatus, setRestaurantStatus] = useState("open");
  const [openingHours, setOpeningHours] = useState("");
  const [closingHours, setClosingHours] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch the initial settings from API
  useEffect(() => {
    setRestaurantName("The Great Restaurant");
    setRestaurantStatus("closed");

    function convertTo24Hour(timeStr) {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":");

      if (hours === "12") {
        hours = "00";
      }

      if (modifier === "PM") {
        hours = parseInt(hours, 10) + 12;
      }

      return `${hours}:${minutes}`;
    }

    // Example usage:
    setOpeningHours(convertTo24Hour("12:30 AM")); // Will convert to 00:30
  }, []);

  const handleSaveChanges = () => {
    const updatedSettings = {
      restaurantName,
      restaurantStatus,
      openingHours,
      closingHours,
    };

    fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSettings),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Settings updated:", data);
      });
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Hamburger Menu Button for Small Screens */}
      <button
        onClick={handleToggleSidebar}
        className="md:hidden p-4 text-gray-600 focus:outline-none"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar (full width on smaller screens when opened) */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block absolute md:relative z-10 h-full transition-all duration-300 ease-in-out bg-white ${
          isSidebarOpen ? "w-full" : "w-auto"
        }`}
      >
        <Sidenavbar onClose={handleToggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full p-6 transition-all duration-300 ease-in-out">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <div className="grid gap-6">
          {/* Restaurant Name */}
          <div>
            <label className="block text-gray-700">Restaurant Name</label>
            <input
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Restaurant Status */}
          <div>
            <label className="block text-gray-700">Restaurant Status</label>
            <select
              value={restaurantStatus}
              onChange={(e) => setRestaurantStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Opening Hours */}
          <div>
            <label className="block text-gray-700">Opening Hours</label>
            <input
              type="time"
              value={openingHours} // This will always be a 24-hour format string
              onChange={(e) => setOpeningHours(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Closing Hours */}
          <div>
            <label className="block text-gray-700">Closing Hours</label>
            <input
              type="time"
              value={closingHours}
              onChange={(e) => setClosingHours(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveChanges}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800"
          >
            Update Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
