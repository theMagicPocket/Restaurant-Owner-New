import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Sidenavbar from "../../components/Sidenavbar"; // Outer Sidebar
// import PropTypes from "prop-types";
import PersonalDetailsForm from "../../components/SettingsForms/PersonalDetailsForm";
import BankAccountsForm from "../../components/SettingsForms/BankAccountsForm";
import RestaurantSettingsForm from "../../components/SettingsForms/RestaurantSettingsForm";

const AccountSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Personal Details");

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Hamburger menu for smaller screens */}
      <button
        onClick={handleToggleSidebar}
        className="md:hidden p-4 text-gray-600 focus:outline-none"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Outer Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative z-10 w-64 bg-white md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <Sidenavbar onClose={handleToggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col p-4 md:p-8 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row">
          {/* Inner Sidebar */}
          <div className="w-full md:w-64 border-r pr-4 md:pr-6">
            <h2 className="text-xl font-semibold mb-4">Settings Menu</h2>
            <ul>
              {["Personal Details", "Bank Accounts", "Restaurant Settings"].map(
                (section) => (
                  <li
                    key={section}
                    onClick={() => handleSectionChange(section)}
                    className={`cursor-pointer p-2 mb-2 rounded-lg ${
                      activeSection === section ? "bg-gray-200" : ""
                    }`}
                  >
                    {section}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Content Based on Active Section */}
          <div className="flex-grow pl-4 md:pl-6">
            {activeSection === "Personal Details" && <PersonalDetailsForm />}
            {activeSection === "Bank Accounts" && <BankAccountsForm />}
            {activeSection === "Restaurant Settings" && (
              <RestaurantSettingsForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings
