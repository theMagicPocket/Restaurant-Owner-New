
import { useState } from "react";
import SummaryCard from "../../components/SummaryCard";
import DataTable from "../../components/DataTable";
import Sidenavbar from "../../components/Sidenavbar";
import { FaTimes, FaBars } from "react-icons/fa";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 relative">
      {/* Sidebar Toggle Button */}
       <button
        onClick={handleToggleSidebar}
        className="md:hidden p-4 text-gray-600 focus:outline-none z-20"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block fixed md:relative z-10 w-64 bg-white shadow-lg md:shadow-none transition-transform duration-300 ease-in-out`}
      >
        <Sidenavbar onClose={handleToggleSidebar} />
      </div>
      {/* Main Content */}
      <div
        className={`flex flex-col w-full transition-all duration-300 ease-in-out p-4 md:ml-0 ${
          isSidebarOpen ? "ml-64" : ""
        }`}
      >
        <div className="flex flex-col gap-4 mb-6 mt-4">
          <div className="text-2xl font-black">Dashboard</div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SummaryCard title="Total Revenue" value="Rs. 10,243.00" />
            <SummaryCard title="Total Orders" value="1263" />
            <SummaryCard title="Total Customers" value="10,243" />
          </div>

          {/* Table Section */}
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

