// components/OrderCard.js


const OrderCard = ({ order }) => {
    
  return (
    <div className="shadow-lg bg-white rounded-md p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 m-2">
      {/* Restaurant and Order Details */}
      <div className="flex-1 flex flex-col justify-between text-gray-700">
        <div className="font-semibold text-lg mb-1">{order.restaurantName}</div>
        <div className="text-sm text-gray-500 mb-2">{order.location}</div>
        <div className="border-t border-gray-200 my-2"></div>

        <div className="text-sm mb-1">Order ID: {order.id}</div>
        <div className="text-sm mb-1">
          Customer: {order.customerName} ({order.orderCount} order)
        </div>
        <div className="text-sm">Contact: {order.customerContact}</div>
      </div>

      <div className="h-auto w-px bg-gray-200 mx-4 hidden md:block"></div>

      {/* Order Items and Total */}
      <div className="flex-1 text-gray-700">
        {order.items.map((item, index) => (
          <div key={index} className="mb-3 flex justify-between items-center">
            <span>
              {item.quantity} x {item.name}
            </span>
            <span>Rs {item.price}</span>
          </div>
        ))}
        <div className="border-t border-gray-200 my-2"></div>
        <div className="font-semibold mt-2 flex justify-between items-center">
          <span>Total Bill:</span>
          <span>Rs {order.totalBill}</span>
        </div>
        <button className="h-10 w-full bg-blue-600 text-center m-3 mx-0 rounded text-white flex items-center justify-center">
          Order Ready
        </button>
      </div>

      <div className="h-auto w-px bg-gray-200 mx-4 hidden md:block"></div>

      {/* Delivery Partner Details */}
      <div className="flex-1 text-gray-700">
        <div className="font-semibold text-lg mb-1">Delivery Partner</div>
        <div className="text-sm mb-2">{order.deliveryPartnerStatus}</div>
        <div className="flex gap-4 mt-2">
          <span className="text-blue-500 cursor-pointer hover:underline">
            Track
          </span>
          <span className="text-blue-500 cursor-pointer hover:underline">
            Call
          </span>
        </div>
        <div className="mt-3 text-sm">Arriving in {order.arrivalTime}</div>
      </div>
    </div>
  );
};

export default OrderCard;
