import { useState } from "react";
import Sidenavbar from "../../components/Sidenavbar";
import { FaTimes, FaBars } from "react-icons/fa";
import OrderCard from "../../components/OrderCard";

const Orders = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("NEW");
  const [selectedOrder, setSelectedOrder] = useState(null); // For showing selected order details
  const [isMobilePopupOpen, setIsMobilePopupOpen] = useState(false); // For mobile popup

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filterOrders = (status) => {
    setSelectedStatus(status);
    setSelectedOrder(null); // Reset selected order when changing status
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    if (window.innerWidth < 768) {
      setIsMobilePopupOpen(true); // Open popup for mobile screens
    }
  };

  const closeMobilePopup = () => {
    setIsMobilePopupOpen(false);
  };

  const orders = [
    {
      id: 5167,
      items: 2,
      totalPrice: 187.2,
      receivedTime: "6 minutes ago",
      status: "NEW",
      pickupTime: "10 MINS",
      restaurant: "Hi-Tech Bawarchi",
    },
    {
      id: 5168,
      items: 2,
      totalPrice: 36,
      receivedTime: "10 minutes ago",
      status: "PREPARING",
      pickupTime: "15 MINS",
      restaurant: "Golconda Chefs",
    },
    {
      id: 5169,
      items: 3,
      totalPrice: 200,
      receivedTime: "15 minutes ago",
      status: "NEW",
      pickupTime: "20 MINS",
      restaurant: "Paradise Biryani",
    },
    {
      id: 5170,
      items: 4,
      totalPrice: 250,
      receivedTime: "20 minutes ago",
      status: "PREPARING",
      pickupTime: "25 MINS",
      restaurant: "Kritunga Restaurant",
    },
    {
      id: 5171,
      items: 1,
      totalPrice: 50,
      receivedTime: "25 minutes ago",
      status: "READY",
      pickupTime: "5 MINS",
      restaurant: "Alpha Hotel",
    },
    {
      id: 5172,
      items: 2,
      totalPrice: 100,
      receivedTime: "30 minutes ago",
      status: "PAST ORDERS",
      pickupTime: "N/A",
      restaurant: "Bawarchi Express",
    },
    {
      id: 5173,
      items: 5,
      totalPrice: 400,
      receivedTime: "35 minutes ago",
      status: "PAST ORDERS",
      pickupTime: "N/A",
      restaurant: "Mehfil Restaurant",
    },
    {
      id: 5174,
      items: 3,
      totalPrice: 300,
      receivedTime: "40 minutes ago",
      status: "NEW",
      pickupTime: "30 MINS",
      restaurant: "Ulava Charu",
    },
  ];

  const filteredOrders = orders.filter(
    (order) => order.status === selectedStatus
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 relative">
      <button
        onClick={handleToggleSidebar}
        className="md:hidden p-4 text-gray-600 focus:outline-none"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block fixed md:relative z-10 w-full md:w-64 bg-white shadow-lg md:shadow-none`}
      >
        <Sidenavbar onClose={handleToggleSidebar} />
      </div>

      <div className="flex w-full h-screen flex-col md:flex-row">
        {/* Left side: Orders list */}
        <div className="w-full md:w-5/12 py-4 px-2 bg-gray-100 flex-grow overflow-y-auto">
          <div className="flex flex-row items-center mb-4 md:hidden">
            {["NEW", "PREPARING", "READY", "PAST ORDERS"].map((status) => (
              <button
                key={status}
                onClick={() => filterOrders(status)}
                className={`${
                  selectedStatus === status
                    ? "bg-blue-900 text-white mr-2"
                    : "bg-gray-200 text-gray-700 mr-2"
                } py-2 px-1 rounded-lg text-sm mb-2 md:mb-0`}
              >
                {status}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 border rounded-lg mb-2 h-10"
          />
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 border rounded-lg bg-white shadow-sm cursor-pointer"
                onClick={() => handleOrderClick(order)}
              >
                <p className="text-blue-600 font-bold">{order.id}</p>
                <p className="text-sm text-gray-500">
                  {order.items} Item for ₹{order.totalPrice}
                </p>
                <p className="text-xs text-gray-400">{order.receivedTime}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{order.status}</span>
                  <div className="ml-2 w-4 h-4 rounded-full border border-gray-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Order details */}
        <div className="hidden md:block w-full md:w-2/3 py-4 bg-gray-100 h-screen flex flex-col">
          <div className="hidden md:flex flex-row mb-2">
            {["NEW", "PREPARING", "READY", "PAST ORDERS"].map((status) => (
              <button
                key={status}
                onClick={() => filterOrders(status)}
                className={`${
                  selectedStatus === status
                    ? "bg-blue-900 text-white mr-2"
                    : "bg-gray-200 text-gray-700 mr-2"
                } py-2 px-4 rounded-lg text-sm`}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="flex-grow">
            <OrderCard order={selectedOrder} />
          </div>
        </div>

        {/* Mobile popup for order details */}
        {isMobilePopupOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4 w-full max-w-lg relative mx-2 my-7">
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={closeMobilePopup}
              >
                <FaTimes size={20} />
              </button>
              <OrderCard order={selectedOrder} /> {/* Reusing the component */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

