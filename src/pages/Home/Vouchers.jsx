
// import { FaBars, FaTimes, FaPlus } from "react-icons/fa";
// import { useState } from "react";
// import Sidenavbar from "../../components/Sidenavbar";
// import Snackbar from "../../components/Snackbar";
// import AddVoucher from "./AddVoucher";

// const Vouchers = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
//   const [isFormOpen, setIsFormOpen] = useState(false); // Form toggle state
//   const [vouchers, setVouchers] = useState([
//     {
//       id: 1,
//       code: "DISC10",
//       name: "Discount10",
//       discountType: "Percentage",
//       discountValue: "10%",
//       maxDiscount: "₹200",
//       minOrderValue: "₹500",
//       startDate: "2024-10-01",
//       endDate: "2024-12-31",
//       usageLimitPerCustomer: 1,
//       totalVoucherLimit: 100,
//       description: "Get 10% off on all orders.",
//       status: "Active",
//     },
//     // Add 19 more sample vouchers here...
//   ]); // Sample data for vouchers

//   const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   const handleToggleForm = () => setIsFormOpen(!isFormOpen);

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
//       <button
//         onClick={handleToggleSidebar}
//         className="md:hidden p-4 text-gray-600 focus:outline-none"
//       >
//         {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//       </button>

//       <div
//         className={` ${
//           isSidebarOpen ? "block" : "hidden"
//         } md:block fixed md:relative z-10 w-full md:w-auto`}
//       >
//         <Sidenavbar onClose={handleToggleSidebar} />
//       </div>

//       <div className="flex flex-col pl-4 pr-4 overflow-y-auto flex-grow">
//         <div className="mt-8 mb-8 bg-white p-8 rounded-lg shadow-lg w-full">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Vouchers</h2>
//             <button
//               onClick={handleToggleForm}
//               className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
//             >
//               <FaPlus size={20} />
//             </button>
//           </div>
//           {isFormOpen && <AddVoucher onClose={handleToggleForm} />}{" "}
//           {/* Render the form */}
//           {/* Display vouchers in a grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {vouchers.map((voucher) => (
//               <div
//                 key={voucher.id}
//                 className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg"
//               >
//                 <h3 className="text-lg font-semibold">{voucher.name}</h3>
//                 <p className="text-gray-600">{voucher.description}</p>
//                 <p className="text-gray-800">
//                   Discount: {voucher.discountValue} ({voucher.discountType})
//                 </p>
//                 <p className="text-gray-800">
//                   Max Discount: {voucher.maxDiscount}
//                 </p>
//                 <p className="text-gray-800">
//                   Min Order: {voucher.minOrderValue}
//                 </p>
//                 <p className="text-gray-800">Status: {voucher.status}</p>
//                 <p className="text-gray-600 text-sm">
//                   Valid from {voucher.startDate} to {voucher.endDate}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Vouchers;


import {
  FaBars,
  FaTimes,
  FaPlus,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { useState } from "react";
import Sidenavbar from "../../components/Sidenavbar";
import AddVoucher from "./AddVoucher";

const Vouchers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const [isFormOpen, setIsFormOpen] = useState(false); // Form toggle state
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      code: "DISC10",
      name: "Discount10",
      discountType: "Percentage",
      discountValue: "10%",
      maxDiscount: "₹200",
      minOrderValue: "₹500",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      usageLimitPerCustomer: 1,
      totalVoucherLimit: 100,
      description: "Get 10% off on all orders.",
      status: "Active",
      isActive: true, // Add isActive property
    },
    {
      id: 1,
      code: "DISC10",
      name: "Discount10",
      discountType: "Percentage",
      discountValue: "10%",
      maxDiscount: "₹200",
      minOrderValue: "₹500",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      usageLimitPerCustomer: 1,
      totalVoucherLimit: 100,
      description: "Get 10% off on all orders.",
      status: "Active",
      isActive: true, // Add isActive property
    },
    {
      id: 1,
      code: "DISC10",
      name: "Discount10",
      discountType: "Percentage",
      discountValue: "10%",
      maxDiscount: "₹200",
      minOrderValue: "₹500",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      usageLimitPerCustomer: 1,
      totalVoucherLimit: 100,
      description: "Get 10% off on all orders.",
      status: "Active",
      isActive: true, // Add isActive property
    },
    {
      id: 1,
      code: "DISC10",
      name: "Discount10",
      discountType: "Percentage",
      discountValue: "10%",
      maxDiscount: "₹200",
      minOrderValue: "₹500",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      usageLimitPerCustomer: 1,
      totalVoucherLimit: 100,
      description: "Get 10% off on all orders.",
      status: "Active",
      isActive: true, // Add isActive property
    },
    {
      id: 1,
      code: "DISC10",
      name: "Discount10",
      discountType: "Percentage",
      discountValue: "10%",
      maxDiscount: "₹200",
      minOrderValue: "₹500",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      usageLimitPerCustomer: 1,
      totalVoucherLimit: 100,
      description: "Get 10% off on all orders.",
      status: "Active",
      isActive: true, // Add isActive property
    },
    {
      id: 1,
      code: "DISC10",
      name: "Discount10",
      discountType: "Percentage",
      discountValue: "10%",
      maxDiscount: "₹200",
      minOrderValue: "₹500",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      usageLimitPerCustomer: 1,
      totalVoucherLimit: 100,
      description: "Get 10% off on all orders.",
      status: "Active",
      isActive: true, // Add isActive property
    },
    {
      id: 1,
      code: "DISC10",
      name: "Discount10",
      discountType: "Percentage",
      discountValue: "10%",
      maxDiscount: "₹200",
      minOrderValue: "₹500",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      usageLimitPerCustomer: 1,
      totalVoucherLimit: 100,
      description: "Get 10% off on all orders.",
      status: "Active",
      isActive: true, // Add isActive property
    },
    {
      id: 1,
      code: "DISC10",
      name: "Discount10",
      discountType: "Percentage",
      discountValue: "10%",
      maxDiscount: "₹200",
      minOrderValue: "₹500",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      usageLimitPerCustomer: 1,
      totalVoucherLimit: 100,
      description: "Get 10% off on all orders.",
      status: "Active",
      isActive: true, // Add isActive property
    },
    {
      id: 1,
      code: "DISC10",
      name: "Discount10",
      discountType: "Percentage",
      discountValue: "10%",
      maxDiscount: "₹200",
      minOrderValue: "₹500",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      usageLimitPerCustomer: 1,
      totalVoucherLimit: 100,
      description: "Get 10% off on all orders.",
      status: "Active",
      isActive: true, // Add isActive property
    },
    {
      id: 1,
      code: "DISC10",
      name: "Discount10",
      discountType: "Percentage",
      discountValue: "10%",
      maxDiscount: "₹200",
      minOrderValue: "₹500",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      usageLimitPerCustomer: 1,
      totalVoucherLimit: 100,
      description: "Get 10% off on all orders.",
      status: "Active",
      isActive: true, // Add isActive property
    },
    {
      id: 1,
      code: "DISC10",
      name: "Discount10",
      discountType: "Percentage",
      discountValue: "10%",
      maxDiscount: "₹200",
      minOrderValue: "₹500",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      usageLimitPerCustomer: 1,
      totalVoucherLimit: 100,
      description: "Get 10% off on all orders.",
      status: "Active",
      isActive: true, // Add isActive property
    },
    {
      id: 1,
      code: "DISC10",
      name: "Discount10",
      discountType: "Percentage",
      discountValue: "10%",
      maxDiscount: "₹200",
      minOrderValue: "₹500",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      usageLimitPerCustomer: 1,
      totalVoucherLimit: 100,
      description: "Get 10% off on all orders.",
      status: "Active",
      isActive: true, // Add isActive property
    },
    // Add 19 more sample vouchers here...
  ]);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleToggleForm = () => setIsFormOpen(!isFormOpen);

  // Function to toggle voucher status
  const toggleVoucherStatus = (id) => {
    setVouchers((prevVouchers) =>
      prevVouchers.map((voucher) =>
        voucher.id === id
          ? { ...voucher, isActive: !voucher.isActive }
          : voucher
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <button
        onClick={handleToggleSidebar}
        className="md:hidden p-4 text-gray-600 focus:outline-none"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div
        className={` ${
          isSidebarOpen ? "block" : "hidden"
        } md:block fixed md:relative z-10 w-full md:w-auto`}
      >
        <Sidenavbar onClose={handleToggleSidebar} />
      </div>

      <div className="flex flex-col pl-4 pr-4 overflow-y-auto flex-grow">
        <div className="mt-4 mb-8 bg-white p-8 rounded-lg shadow-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Vouchers</h2>
            {!isFormOpen ? (
              <button
                onClick={handleToggleForm}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200"
              >
                <FaPlus size={15} />
              </button>
            ) : (
              <button
                onClick={() => setIsFormOpen(false)}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Back
              </button>
            )}
          </div>

          {isFormOpen ? (
            <AddVoucher onClose={handleToggleForm} /> // Render the form
          ) : (
            // Display vouchers in a grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vouchers.map((voucher) => (
                <div
                  key={voucher.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {voucher.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{voucher.description}</p>
                  <p className="text-gray-800 font-bold">
                    Discount:{" "}
                    <span className="text-green-500">
                      {voucher.discountValue}
                    </span>{" "}
                    ({voucher.discountType})
                  </p>
                  <p className="text-gray-800">
                    Max Discount:{" "}
                    <span className="text-gray-700">{voucher.maxDiscount}</span>
                  </p>
                  <p className="text-gray-800">
                    Min Order:{" "}
                    <span className="text-gray-700">
                      {voucher.minOrderValue}
                    </span>
                  </p>
                  <p className="text-gray-800">
                    Status:{" "}
                    <span
                      className={`font-bold ${voucher.isActive ? "text-blue-500" : "text-red-500"}`}
                    >
                      {voucher.isActive ? "Active" : "Inactive"}
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    Valid from{" "}
                    <span className="font-semibold">{voucher.startDate}</span>{" "}
                    to <span className="font-semibold">{voucher.endDate}</span>
                  </p>
                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleVoucherStatus(voucher.id)}
                    className={`mt-4 flex items-center justify-center p-2 rounded-full transition duration-200 ${voucher.isActive ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-300 hover:bg-gray-400 text-gray-700"}`}
                  >
                    {voucher.isActive ? (
                      <FaToggleOn size={20} />
                    ) : (
                      <FaToggleOff size={20} />
                    )}
                    <span className="ml-2">
                      {voucher.isActive ? "Deactivate" : "Activate"}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vouchers;
