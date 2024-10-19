import { FiPrinter } from "react-icons/fi";

const OrderCard = ({ order }) => {
  if (!order) {
    return <p className="text-gray-600">Select an order to see details</p>;
  }

  return (
    <div className="flex flex-col h-full p-4 border rounded-lg bg-white mb-4">
      <div className="flex justify-between items-center bg-gray-100 h-16 p-2">
        <h2 className="text-blue-800 text-lg font-bold">#{order.id}</h2>
        <p className="text-xs text-gray-500">{order.receivedTime}</p>
        <button className="text-gray-500 text-sm flex items-center">
          <FiPrinter className="mr-1" /> Print
        </button>
      </div>

      {/* Order items */}
      <div className="flex-grow overflow-y-auto max-h-72 mt-2">
        <div className="mt-2">
          <div className="flex justify-between items-center border-b py-2">
            <p className="text-gray-700">{order.restaurant}</p>
            <p className="text-gray-700">₹{order.totalPrice}</p>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <p className="text-gray-700">{order.restaurant}</p>
            <p className="text-gray-700">₹{order.totalPrice}</p>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <p className="text-gray-700">{order.restaurant}</p>
            <p className="text-gray-700">₹{order.totalPrice}</p>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <p className="text-gray-700">{order.restaurant}</p>
            <p className="text-gray-700">₹{order.totalPrice}</p>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <p className="text-gray-700">{order.restaurant}</p>
            <p className="text-gray-700">₹{order.totalPrice}</p>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <p className="text-gray-700">{order.restaurant}</p>
            <p className="text-gray-700">₹{order.totalPrice}</p>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <p className="text-gray-700">{order.restaurant}</p>
            <p className="text-gray-700">₹{order.totalPrice}</p>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <p className="text-gray-700">{order.restaurant}</p>
            <p className="text-gray-700">₹{order.totalPrice}</p>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <p className="text-gray-700">{order.restaurant}</p>
            <p className="text-gray-700">₹{order.totalPrice}</p>
          </div>
        </div>
      </div>

      {/* Order info */}
      <div className="flex flex-col justify-between mt-2 border-t pt-2 flex-grow">
        <div className="mb-auto"></div>

        {/* Fixed action buttons */}
        <div className="sticky bottom-0 py-4">
          <div className="flex justify-between items-center bg-gray-100 p-2 mb-2">
            <div>
              <p className="text-gray-500 text-sm">Pick-up Time</p>
              <p className="text-gray-700">{order.pickupTime}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Delivery Executive</p>
              <p className="text-gray-700">ASSIGNING...</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Grand Total</p>
              <p className="text-gray-700">₹{order.totalPrice}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button className="bg-red-800 text-white py-2 px-6 rounded-lg">
              Reject Order
            </button>
            <button className="bg-blue-900 text-white py-2 px-6 rounded-lg">
              Accept Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
