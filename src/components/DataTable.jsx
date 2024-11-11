import { useSelector } from "react-redux";
import { useGetFoodItemsQuery } from "../app/Apis/FoodApi";
const DataTable = ({ orders }) => {
  console.log("dashboard orders check", orders);
  const hotelId = useSelector((state) => state.auth.restaurant_id);
  const { data: foodItems } = useGetFoodItemsQuery({ hotelId });
  console.log(foodItems);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Order ID</th>
            <th className="py-3 px-6 text-left">Total Price</th>
            <th className="py-3 px-6 text-left">Details</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-left font-semibold">
                  {order.order_id}
                </td>
                <td className="py-3 px-6 text-left">
                  {order.order_total_price}
                </td>
                <td className="py-3 px-6 text-left">
                  {order.order_items && order.order_items.length > 0 ? (
                    <div className="space-y-2">
                      {order.order_items.map((item, itemIndex) => {
                        const foodItem = foodItems?.data.filter((Fitem) => {
                          return Fitem.id === item.fooditem_id;
                        });
                        const addonNames = item.addons
                          ? item.addons.map((addonId) => {
                              const addonItem = foodItems?.data.find(
                                (Fitem) => Fitem.id === addonId
                              );
                              return addonItem ? addonItem.item_name : null;
                            })
                          : [];

                        console.log("fooditem check", foodItem);

                        return (
                          // <span key={itemIndex} className="block">
                          //   Item {itemIndex+1}: {foodItem ? foodItem[0].item_name : null},
                          //   Quantity: {item.quantity}, Price: {item.price},
                          //   Addons:{" "}

                          //   {addonNames.length > 0
                          //     ? addonNames.join(", ")
                          //     : "None"}
                          // </span>
                          <span key={itemIndex} className="block">
                            <span style={{ fontWeight: "bold" }}>
                              Item {itemIndex + 1}:
                            </span>{" "}
                            {foodItem ? foodItem[0].item_name : null},{" "}
                            <span style={{ fontWeight: "bold" }}>
                              Quantity:
                            </span>{" "}
                            {item.quantity},{" "}
                            <span style={{ fontWeight: "bold" }}>Price:</span>{" "}
                            {item.price},{" "}
                            <span style={{ fontWeight: "bold" }}>Addons:</span>{" "}
                            {addonNames.length > 0
                              ? addonNames.join(", ")
                              : "None"}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    "No items found"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-3 px-6 text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

{
  /* Addons:{" "}
                          {item.addons && item.addons.length > 0
                            ? item.addons.join(", ")
                            : "None"} */
}
{
  /* <p>
                            <strong>Addons:</strong>{" "}
                            {item.addons && item.addons.length > 0 ? (
                              <ul className="list-disc list-inside">
                                {item.addons.map((addon, addonIndex) => (
                                  <li key={addonIndex}>{addon}</li>
                                ))}
                              </ul>
                            ) : (
                              "None"
                            )}
                          </p> */
}
