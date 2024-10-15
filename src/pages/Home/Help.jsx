import { useState } from "react";
import Sidenavbar from "../../components/Sidenavbar"; // Sidebar from dishes component
import { FaBars, FaTimes } from "react-icons/fa";
import helpImage from "../../assets/help.jpg";

const HelpCenter = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Hamburger menu for smaller screens */}
      <button
        onClick={handleToggleSidebar}
        className="md:hidden p-4 text-gray-600 focus:outline-none"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative z-10 w-64 bg-white md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <Sidenavbar onClose={handleToggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col p-4 md:p-8">
        <div className="relative h-64 w-full bg-gray-200 rounded-lg shadow-lg mb-6 flex items-center justify-center">
          <img
            src={helpImage}
            alt="Help Center Header"
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Form Section */}
          <div className="flex-grow bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              How can we help you?
            </h2>
            <form>
              <div className="grid grid-cols-1 gap-4">
                {/* Select Category */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How can we help you?
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Choose an option</option>
                    <option>General Inquiry</option>
                    <option>Report an Issue</option>
                    <option>Feedback</option>
                  </select>
                </div>

                {/* Full Name */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email Address */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your email address"
                  />
                </div>

                {/* Mobile Number */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number (optional)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your mobile number"
                  />
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Describe your issue or feedback"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
                  >
                    Submit feedback
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Help Options Section */}
          <div className="flex-shrink-0 w-full md:w-72">
            <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
              <h3 className="text-xl font-semibold mb-2">
                Report a Safety Emergency
              </h3>
              <p className="text-sm text-gray-600">
                We are committed to the safety of everyone using our platform.
              </p>
              <button className="mt-2 text-red-500 hover:underline">
                Report here
              </button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">
                Issue with your live order?
              </h3>
              <p className="text-sm text-gray-600">
                Click on the Support or Online ordering help section in your app
                to connect to our customer support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
