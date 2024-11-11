// import { useState } from "react";
// import SummaryCard from "../../components/SummaryCard";
// import DataTable from "../../components/DataTable";
// import Sidenavbar from "../../components/Sidenavbar";
// import { FaTimes, FaBars } from "react-icons/fa";

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleToggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 relative">
//       {/* Sidebar Toggle Button */}
//       <button
//         onClick={handleToggleSidebar}
//         className="md:hidden p-4 text-gray-600 focus:outline-none z-20"
//       >
//         {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`${
//           isSidebarOpen ? "block" : "hidden"
//         } md:block fixed md:relative z-10 w-64 bg-white shadow-lg md:shadow-none transition-transform duration-300 ease-in-out`}
//       >
//         <Sidenavbar onClose={handleToggleSidebar} />
//       </div>
//       {/* Main Content */}
//       <div
//         className={`flex flex-col w-full transition-all duration-300 ease-in-out p-4 md:ml-0 ${
//           isSidebarOpen ? "ml-64" : ""
//         }`}
//       >
//         <div className="flex flex-col gap-4 mb-6 mt-4">
//           <div className="text-2xl font-black">Dashboard</div>

//           {/* Summary Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <SummaryCard title="Total Revenue" value="Rs. 10,243.00" />
//             <SummaryCard title="Total Orders" value="1263" />
//             <SummaryCard title="Today Revenue" value="10,243" />
//             <SummaryCard title="Today Orders" value="1263" />
//           </div>

//           {/* Table Section */}
//           <DataTable />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState } from "react";
import SummaryCard from "../../components/SummaryCard";
import DataTable from "../../components/DataTable";
import Sidenavbar from "../../components/Sidenavbar";
import { FaTimes, FaBars } from "react-icons/fa";
// import { useGetStatsQuery, useGetOrdersQuery } from "../../api/DashboardApi";
import { useGetStatsQuery } from "../../app/Apis/DashboardApi";
import { useGetOrdersQuery } from "../../app/Apis/FoodApi";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Example hotel ID
  const hotelId = useSelector((state) => state.auth.restaurant_id);

  // Fetch statistics data
  const {
    data: statsData,
    isLoading: isStatsLoading,
    error: statsError,
  } = useGetStatsQuery(hotelId);

  // Fetch orders with status "PICKED_UP"
  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    error: ordersError,
  } = useGetOrdersQuery({ orderStatus: "PICKED_UP", hotelId });

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {isStatsLoading ? (
              <p>Loading...</p>
            ) : statsError ? (
              <p>Error loading stats</p>
            ) : (
              <>
                <SummaryCard
                  title="Total Revenue"
                  value={`Rs. ${statsData?.data.total_revenue || 0}`}
                />
                <SummaryCard
                  title="Total Orders"
                  value={statsData?.data.total_orders || 0}
                />
                <SummaryCard
                  title="Today Revenue"
                  value={`Rs. ${statsData?.data.today_revenue || 0}`}
                />
                <SummaryCard
                  title="Today Orders"
                  value={statsData?.data.today_orders || 0}
                />
              </>
            )}
          </div>

          {/* Table Section for Today's Orders */}
          <h2 className="text-xl font-bold mb-4">Today's Orders</h2>
          {isOrdersLoading ? (
            <p>Loading orders...</p>
          ) : ordersError ? (
            <p>Error loading orders</p>
          ) : (
            <DataTable orders={ordersData?.data || []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
