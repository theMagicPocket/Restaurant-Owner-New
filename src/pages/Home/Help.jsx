import { useState } from "react";
import Sidenavbar from "../../components/Sidenavbar"; // Sidebar from dishes component
import { FaBars, FaTimes } from "react-icons/fa";
import helpImage from "../../assets/help.jpg";
import { useSelector } from "react-redux";
import { usePostHelpMutation } from "../../app/Apis/HelpAPi";
import Snackbar from "../../components/Snackbar";

const HelpCenter = () => {
  const email = useSelector((state) => state.auth.user_email);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [severity, setSeverity] = useState(""); // Track severity
  const [message, setMessage] = useState(""); // Track message
  const hotelId = useSelector((state) => state.auth.restaurant_id); // Track selected hotel ID (set default or select option)
  const [postHelp, { isLoading }] = usePostHelpMutation(); // API hook
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!severity || !message) {
      setSnackbarMessage("Please fill all fields.");
      setSnackbarType("error");
      return;
    }

    // Prepare API body
    const helpData = {
      hotel_id: hotelId,
      email: email,
      query: message,
      status: "PENDING", // Status is always "PENDING" when posting
      severity: severity,
    };

    try {
      // Call the API
      await postHelp(helpData).unwrap();
      setSnackbarMessage(
        "Your help request has been submitted successfully! Please give us some time, and we'll get back to you."
      );
      setSnackbarType("success");
      // Optionally, reset form here if needed
      setMessage("");
      setSeverity("");
    } catch (error) {
      setSnackbarMessage("Failed to submit help request. Please try again.");
      setSnackbarType("error");
      console.error("Error submitting help request:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Snackbar
        message={snackbarMessage}
        type={snackbarType}
        onClose={() => setSnackbarMessage("")} // Clear message on close
      />
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
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                {/* Email Address */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none bg-gray-50 text-gray-500 font-semibold"
                    placeholder="Your email address"
                  />
                </div>

                {/* Severity */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 font-semibold text-gray-600"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                  >
                    <option value="" disabled>
                      Please select urgency level
                    </option>
                    <option value="LOW">Low</option>
                    <option value="MID">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue or feedback"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
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
