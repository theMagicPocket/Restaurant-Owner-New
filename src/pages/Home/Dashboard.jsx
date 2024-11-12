import { useState } from "react";
import SummaryCard from "../../components/SummaryCard";
import DataTable from "../../components/DataTable";
import Sidenavbar from "../../components/Sidenavbar";
import { FaTimes, FaBars } from "react-icons/fa";
import { useGetStatsQuery } from "../../app/Apis/DashboardApi";
import { useGetOrdersQuery } from "../../app/Apis/FoodApi";
import { useSelector } from "react-redux";
import { useUpdateHotelMutation } from "../../app/Apis/RegisterApi";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("today"); // "today", "month", "all"
  //  const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
  const isRestaurantOpen = useSelector((state) => state.auth.is_open);
  const isVerified = useSelector((state) => state.auth.is_verified);
  

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

  const [updateHotel] = useUpdateHotelMutation();
  const handleToggleRestaurant = async () => {
    if (!isVerified) {
      alert(
        "Your hotel is not verified yet. Please give us some time to verify it."
      );
      return;
    }

    const confirmToggle = window.confirm(
      `Are you sure you want to ${isRestaurantOpen ? "close" : "open"} the restaurant?`
    );
    if (confirmToggle) {
      try {
        // Call the API to update the restaurant status
        const response = await updateHotel({
          hotelId,
          data: { is_open: !isRestaurantOpen },
        }).unwrap();

        // Dispatch the action to update the state in Redux
        // dispatch(updateRestaurantStatus(response.data.is_open));
        console.log("update successfully", response);
      } catch (error) {
        console.error("Failed to update restaurant status:", error);
      }
    }
  };


  // Function to filter orders based on the selected date range
  const filterOrders = (orders, filter) => {
    const currentDate = new Date();
    console.log(currentDate);
    return orders.filter((order) => {
      const orderDate = new Date(order.created_at);
      switch (filter) {
        case "today":
          return (
            orderDate.getDate() === currentDate.getDate() &&
            orderDate.getMonth() === currentDate.getMonth() &&
            orderDate.getFullYear() === currentDate.getFullYear()
          );
        case "month":
          return (
            orderDate.getMonth() === currentDate.getMonth() &&
            orderDate.getFullYear() === currentDate.getFullYear()
          );
        case "all":
        default:
          return true;
      }
    });
  };

  // Handle the sidebar toggle
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle the dropdown filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter orders based on the selected filter
  const filteredOrders = ordersData
    ? filterOrders(ordersData.data, filter)
    : [];

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
          <div className="flex items-center justify-center">
            <label className="mr-2 text-gray-700 font-semibold">
              {isRestaurantOpen ? "Restaurant Opened" : "Restaurant Closed"}
            </label>
            <button
              onClick={handleToggleRestaurant}
              className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors ${
                isRestaurantOpen ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <span
                className={`transform transition-transform w-5 h-5 bg-white rounded-full ${
                  isRestaurantOpen ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
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

          {/* Dropdown to select time range */}

          {/* Table Section for Filtered Orders */}
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">Orders</h2>
            <div className="flex items-center mb-4">
              <label htmlFor="orderFilter" className="text-xl font-bold mr-2">
                Sort by:
              </label>
              <select
                id="orderFilter"
                value={filter}
                onChange={handleFilterChange}
                className="p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="month">This Month</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>

          {isOrdersLoading ? (
            <p>Loading orders...</p>
          ) : ordersError ? (
            <p>Error loading orders</p>
          ) : (
            <DataTable orders={filteredOrders} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
