
import { useState, useMemo } from "react";
import Sidenavbar from "../../components/Sidenavbar";
import { FaTimes, FaBars } from "react-icons/fa";
import OrderCard from "../../components/OrderCard";
import { useGetOrdersQuery } from "../../app/Apis/FoodApi";
import { useSelector } from "react-redux";
import { useGetFoodItemsQuery } from "../../app/Apis/FoodApi";
import { useEffect } from "react";

const Orders = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("PLACED");
  const [isMobilePopupOpen, setIsMobilePopupOpen] = useState(false); // For mobile popup
  const hotelId = useSelector((state) => state.auth.restaurant_id);
  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    error,
  } = useGetOrdersQuery({
    orderStatus: selectedStatus,
    hotelId: hotelId, // Replace with dynamic hotel ID as needed
  });
  const filteredOrders = ordersData?.data;
  const { data: foodItemsData, isLoading: isFoodItemsLoading } =
    useGetFoodItemsQuery();
   const [selectedOrder, setSelectedOrder] = useState(null);

  // useEffect to set the initial selected order
  useEffect(() => {
    if (filteredOrders && filteredOrders.length > 0) {
      setSelectedOrder(filteredOrders[0]); // Set the first order as selected
    }
  }, [filteredOrders]); 

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

  // Move the useMemo hook before any returns
  const foodItemsMap = useMemo(() => {
    if (!foodItemsData) return {};

    return foodItemsData.data.reduce((acc, foodItem) => {
      acc[foodItem.id] = foodItem; // Create a map with food item ID as the key
      return acc;
    }, {});
  }, [foodItemsData]);

  // Helper function to get food item details by ID
  const getFoodItemDetails = (fooditem_id) => {
    return foodItemsMap[fooditem_id] || {};
  };

  // Helper function to get add-on details by ID
  const getAddonDetails = (addonIds) => {
    return addonIds.map((addonId) => foodItemsMap[addonId] || {});
  };

  // Loading and error states
  if (isOrdersLoading || isFoodItemsLoading) return <p>Loading orders...</p>;
  if (error) return <p>Failed to load orders</p>;

  
  console.log(ordersData);

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
            {["PLACED", "ACCEPTED", "READY", "PICKED_UP"].map((status) => (
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
                className={`p-4 border rounded-lg bg-white shadow-sm cursor-pointer ${
                  selectedOrder?.order_id === order.order_id
                    ? "bg-gray-300"
                    : ""
                }`} // Apply background color if the order is selected
                onClick={() => handleOrderClick(order)}
              >
                <p className="text-blue-600 font-bold">{order.order_id}</p>
                <p className="text-sm text-gray-500">
                  {order.items} Item for ₹{order.order_total_price}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(order.created_at).toLocaleString()}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {order.order_status}
                  </span>
                  <div className="ml-2 w-4 h-4 rounded-full border border-gray-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Order details */}
        <div className="hidden md:block w-full md:w-2/3 py-4 bg-gray-100 h-screen flex flex-col">
          <div className="hidden md:flex flex-row mb-2">
            {["PLACED", "ACCEPTED", "READY", "PICKED_UP"].map((status) => (
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
          <div className="flex-grow h-full flex flex-col">
            {selectedOrder ? (
              <OrderCard
                order={selectedOrder}
                getFoodItemDetails={getFoodItemDetails}
                getAddonDetails={getAddonDetails}
                filteredOrders={filteredOrders}
                setSelectedOrder={setSelectedOrder}
              />
            ) : (
              <p className="text-gray-600">No orders to display</p>
            )}
          </div>
        </div>

        {/* Mobile popup for order details */}
        {isMobilePopupOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4 w-full max-w-lg relative mx-2 my-2">
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={closeMobilePopup}
              >
                <FaTimes size={20} />
              </button>
              {selectedOrder ? (
                <OrderCard
                  order={selectedOrder}
                  getFoodItemDetails={getFoodItemDetails}
                  getAddonDetails={getAddonDetails}
                  filteredOrders={filteredOrders}
                  setSelectedOrder={setSelectedOrder}
                />
              ) : (
                <p className="text-gray-600">No orders to display</p>
              )}
              {/* Reusing the component */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;


