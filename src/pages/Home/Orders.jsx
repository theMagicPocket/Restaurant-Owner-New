import { useState } from "react";
import Sidenavbar from "../../components/Sidenavbar";
import { FaTimes, FaBars } from "react-icons/fa";
import OrderCard from "../../components/OrderCard";
// import { useGetOrdersQuery } from "../../app/Apis/FoodApi";

const Orders = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [status, setStatus] = useState("PLACED"); // Default status
  // const { data: ordersData, isLoading, error } = useGetOrdersQuery(status);
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Sample order data
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const orderData = {
    restaurantName: "Kebab & Curry",
    location: "Sector 43, Gurgaon",
    id: "12345678 9023",
    customerName: "Rahul",
    orderCount: 3,
    customerContact: "8370939010",
    items: [
      { name: "Paneer Kabab", quantity: 1, price: 405 },
      { name: "Chicken Tikka Kabab", quantity: 1, price: 405 },
    ],
    totalBill: 850,
    deliveryPartnerStatus: "Raghav is on the way",
    arrivalTime: "8 mins",
  };
  const orders = Array.from({ length: 20 }, (_, index) => ({
    ...orderData,
    id: `12345678 90${index + 23}`, // Assign a unique ID to each order
  }));

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 relative">
      <button
        onClick={handleToggleSidebar}
        className="md:hidden p-4 text-gray-600 focus:outline-none"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar (hidden on smaller screens unless toggled) */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block fixed md:relative z-10 w-full md:w-64 bg-white shadow-lg md:shadow-none`}
      >
        <Sidenavbar onClose={handleToggleSidebar} />
      </div>

      {/* Main Content */}
      <div
        className={`flex flex-col w-full transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : ""
        } md:ml-0 p-4`}
      >
        <div className="flex gap-2 mb-4">
          {[
            "PLACED",
            "ACCEPTED",
            "READY",
            "PICKED_UP",
            "DELIVERED",
            "CANCELLED_BY_HOTEL",
          ].map((statusType) => (
            <button
              key={statusType}
              onClick={() => handleStatusChange(statusType)}
              className={`${
                status === statusType ? "bg-blue-600 text-white" : "bg-white"
              } px-4 py-2 rounded shadow-md`}
            >
              {statusType.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Order Card */}
        {/* <OrderCard order={orderData} /> */}
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;

{
  /* Order Status Summary */
}
{
  /* <div className="flex flex-wrap gap-4 mb-6 mt-4">
          <span className="bg-white shadow-md p-2 px-4 rounded text-red-600">
            Preparing: {2}
          </span>
          <span className="bg-white shadow-md p-2 px-4 rounded text-green-600">
            Ready: {1}
          </span>
          <span className="bg-white shadow-md p-2 px-4 rounded text-gray-600">
            Picked Up: {0}
          </span>
        </div> */
}