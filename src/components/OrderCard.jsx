import { FiPrinter } from "react-icons/fi";

const OrderCard = ({ order, getFoodItemDetails, getAddonDetails }) => {
  if (!order) {
    return <p className="text-gray-600">Select an order to see details</p>;
  }
  console.log(order)

  return (
    <div className="flex flex-col h-full p-4 border rounded-lg bg-white mb-4">
      <div className="flex justify-between items-center bg-gray-100 h-16 p-2">
        <h2 className="text-blue-800 text-lg font-bold">
          #{order.order_id.slice(-4)}
        </h2>
        <p className="text-xs text-gray-500">
          {new Date(order.created_at).toLocaleString()}
        </p>
        <button className="text-gray-500 text-sm flex items-center">
          <FiPrinter className="mr-1" /> Print
        </button>
      </div>

      {/* Order items */}
      <div className="flex-grow overflow-y-auto max-h-72 mt-2">
        <div className="mt-2">
          {order.order_items.map((item) => {
            const foodItem = getFoodItemDetails(item.fooditem_id);
            const addons = getAddonDetails(item.addons);

            return (
              <div key={item.fooditem_id} className="border-b py-2">
                <div className="flex justify-between px-2">
                  <p className="text-gray-700 font-bold">
                    {foodItem.item_name} x {item.quantity}
                  </p>
                  {/* <p className="text-gray-500">{foodItem.description}</p> */}
                  <p className="text-gray-700">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>

                {/* Add-ons */}
                {addons.length > 0 && (
                  <div className="mt-1">
                    <p className="text-gray-500 text-sm">Add-ons:</p>
                    {addons.map((addon) => (
                      <p
                        key={addon.id}
                        className="flex justify-between text-gray-700"
                      >
                        <p> + {addon.item_name} </p>
                        <p>(₹{addon.price})</p>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
              {/* <p className="text-gray-700">{order.pickupTime}</p> */}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Delivery Executive</p>
              <p className="text-gray-700">ASSIGNING...</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Grand Total</p>
              <p className="text-gray-700">₹{order.order_total_price}</p>
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
