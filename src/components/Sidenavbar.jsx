import {
  FaTachometerAlt,
  FaClipboardList,
  FaUtensils,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../app/slices/authentication/authSlice";

const Sidenavbar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [activeItem, setActiveItem] = useState(location.pathname); // Set default active item
  const dispatch = useDispatch();

  useEffect(() => {
    // Update activeItem when the route changes
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleItemClick = (path) => {
    if (path === "/logout") {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Dispatch the logout action to reset Redux state
          dispatch(logout());
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error logging out: ", error);
        });
    } else {
      navigate(path); // Navigate to the selected path
    }
  };
  return (
    <div className="sticky top-0 md:h-screen w-full md:w-64 p-6 bg-white shadow-lg rounded-lg flex flex-col justify-between">
      <button
        onClick={onClose}
        className="block md:hidden text-gray-600 mb-4 focus:outline-none"
      >
        <FaTimes size={24} />
      </button>
      <div>
        <SidebarItem
          icon={<FaTachometerAlt />}
          label="Dashboard"
          path="/dashboard"
          activeItem={activeItem}
          onItemClicked={handleItemClick}
        />
        <SidebarItem
          icon={<FaClipboardList />}
          label="Order Line"
          path="/orders"
          activeItem={activeItem}
          onItemClicked={handleItemClick}
        />
        <SidebarItem
          icon={<FaUtensils />}
          label="Manage Dishes"
          path="/manage"
          activeItem={activeItem}
          onItemClicked={handleItemClick}
        />
        <SidebarItem
          icon={<FaUtensils />}
          label="Add Dish"
          path="/add"
          activeItem={activeItem}
          onItemClicked={handleItemClick}
        />
        <SidebarItem
          icon={<FaUtensils />}
          label="Manage Vouchers"
          path="/vouchers"
          activeItem={activeItem}
          onItemClicked={handleItemClick}
        />
      </div>
      <div>
        <SidebarItem
          icon={<FaCog />}
          label="Settings"
          path="/settings"
          activeItem={activeItem}
          onItemClicked={handleItemClick}
        />
        <SidebarItem
          icon={<FaQuestionCircle />}
          label="Help Center"
          path="/help"
          activeItem={activeItem}
          onItemClicked={handleItemClick}
        />
        <SidebarItem
          icon={<FaSignOutAlt />}
          label="Logout"
          path="/logout"
          activeItem={activeItem}
          onItemClicked={handleItemClick}
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, path, activeItem, onItemClicked }) => {
  const isActive = activeItem === path;

  const handleClick = () => {
    onItemClicked(path);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center mb-6 p-2 rounded-lg transition-all cursor-pointer ${
        isActive ? "bg-blue-800 text-white" : "hover:bg-gray-200 text-gray-800"
      }`}
    >
      <div className="mr-4 text-xl">{icon}</div>
      <span>{label}</span>
    </div>
  );
};

Sidenavbar.propTypes = {
  onClose: PropTypes.func.isRequired, // Ensure onClose is required
};

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired, // Ensure icon is an element (since it's a JSX element)
  label: PropTypes.string.isRequired, // Label should be a string
  path: PropTypes.string.isRequired, // Path is a string
  activeItem: PropTypes.string.isRequired, // Active item is a string
  onItemClicked: PropTypes.func.isRequired, // Function to handle click
};

export default Sidenavbar;
