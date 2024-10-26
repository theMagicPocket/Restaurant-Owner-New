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
import { useGetAllVouchersQuery } from "../../app/Apis/FoodApi";
// import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useDeleteVoucherMutation } from "../../app/Apis/FoodApi";
import Snackbar from "../../components/Snackbar";

const Vouchers = () => {
  const { data: vouchers, refetch } = useGetAllVouchersQuery();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const [isFormOpen, setIsFormOpen] = useState(false); // Form toggle state
  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [deleteVoucher] = useDeleteVoucherMutation();
  const [snackbarMessage, setSnackbarMessage] = useState("");
   const [snackbarType, setSnackbarType] = useState("success"); 
  const [editingVoucher, setEditingVoucher] = useState(null);
  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
    if (!isFormOpen) setEditingVoucher(null); // Reset editing mode if closing form
  };
   const editVoucher = (voucher) => {
     setEditingVoucher(voucher);
     setIsFormOpen(true); // Open the form in editing mode
   };

  // Function to toggle voucher status
  const toggleVoucherStatus = () => {
    // setVouchers((prevVouchers) =>
    //   prevVouchers.map((voucher) =>
    //     voucher.id === id
    //       ? { ...voucher, isActive: !voucher.isActive }
    //       : voucher
    //   )
    // );
  };

  const handleDeleteVoucher = async (voucherId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this voucher?"
    );
    if (!isConfirmed) return; 
    try {
      await deleteVoucher(voucherId).unwrap();
      refetch();
      setSnackbarMessage("Voucher deleted successfully");
      setSnackbarType("success");
    } catch (error) {
      setSnackbarMessage("Failed to delete voucher, please try again.");
      setSnackbarType("error");
      console.log(error);
    }
  };

  console.log(vouchers);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Snackbar
        message={snackbarMessage}
        type={snackbarType}
        onClose={() => setSnackbarMessage("")} // Clear message on close
      />
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
            <button
              onClick={handleToggleForm}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200"
            >
              {isFormOpen ? "Back" : <FaPlus size={15} />}
            </button>
          </div>

          {isFormOpen ? (
            <AddVoucher
              onClose={handleToggleForm}
              refetch={refetch}
              voucher={editingVoucher}
            /> // Pass voucher as prop for editing
          ) : (
            // Display vouchers in a grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 relative">
              {vouchers?.data.map((voucher) => (
                <div
                  key={voucher.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 border border-gray-200 relative"
                >
                  {/* Top-right edit and delete icons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => editVoucher(voucher)}
                      className="p-1 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white transition duration-200"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteVoucher(voucher.id)}
                      className="p-1 rounded-full bg-red-500 hover:bg-red-600 text-white transition duration-200"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-lg font-semibold text-blue-600 mb-2">
                    {voucher.voucher_name}
                  </h3>
                  <p className="text-gray-500 mb-2">{voucher.description}</p>
                  <p className="text-gray-900 font-medium mb-1">
                    Discount:{" "}
                    <span className="text-green-600 font-semibold">
                      {voucher.percentage}%
                    </span>
                  </p>
                  <p className="text-gray-900 font-medium mb-1">
                    Max Discount:{" "}
                    <span className="text-gray-700 font-semibold">
                      Rs {voucher.max_discount_amt}
                    </span>
                  </p>
                  <p className="text-gray-900 font-medium mb-1">
                    Min Order:{" "}
                    <span className="text-gray-700 font-semibold">
                      Rs {voucher.min_cart_value}
                    </span>
                  </p>
                  <p className="text-gray-900 font-medium mb-1">
                    Voucher Code:{" "}
                    <span className="text-gray-700 font-semibold">
                      {voucher.voucher_code}
                    </span>
                  </p>
                  <p className="text-gray-900 font-medium mb-1">
                    Per User Limit:{" "}
                    <span className="text-gray-700 font-semibold">
                      {voucher.per_user_usage_limit}
                    </span>
                  </p>
                  <p className="text-gray-900 font-medium mb-1">
                    Usage Limit:{" "}
                    <span className="text-gray-700 font-semibold">
                      {voucher.usage_limit}
                    </span>
                  </p>
                  <p className="text-gray-900 font-medium mb-1">
                    Current Usage:{" "}
                    <span className="text-gray-700 font-semibold">
                      {voucher.current_usage_count}
                    </span>
                  </p>
                  <p className="text-gray-900 font-medium mb-1">
                    Status:{" "}
                    <span
                      className={`font-bold ${voucher.is_active ? "text-blue-500" : "text-red-500"}`}
                    >
                      {voucher.is_active ? "Active" : "Inactive"}
                    </span>
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Valid until{" "}
                    <span className="font-semibold">{voucher.validity}</span>
                  </p>

                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleVoucherStatus(voucher.id)}
                    className={`mt-2 flex items-center justify-center p-2 rounded-full shadow transition duration-200 ${
                      voucher.is_active
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-gray-300 hover:bg-gray-400 text-gray-700"
                    }`}
                  >
                    {voucher.is_active ? (
                      <FaToggleOn size={20} />
                    ) : (
                      <FaToggleOff size={20} />
                    )}
                    <span className="ml-2">
                      {voucher.is_active ? "Deactivate" : "Activate"}
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


// import { useState } from "react";
// import {
//   useGetAllVouchersQuery,
//   useDeleteVoucherMutation,
// } from "../../app/Apis/FoodApi";
// import AddVoucher from "./AddVoucher";
// import Snackbar from "../../components/Snackbar";

// const Vouchers = () => {
//   const { data: vouchers, refetch } = useGetAllVouchersQuery();
//   const [deleteVoucher] = useDeleteVoucherMutation();
//   const [editVoucher, setEditVoucher] = useState(null); // Stores the voucher to edit
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarType, setSnackbarType] = useState("success");

//   const handleDeleteVoucher = async (voucherId) => {
//     try {
//       await deleteVoucher(voucherId).unwrap();
//       setSnackbarMessage("Voucher deleted successfully");
//       setSnackbarType("success");
//       refetch(); // Refresh voucher list
//     } catch (error) {
//       setSnackbarMessage("Failed to delete voucher, please try again.");
//       setSnackbarType("error");
//     }
//   };

//   return (
//     <div>
//       <Snackbar
//         message={snackbarMessage}
//         type={snackbarType}
//         onClose={() => setSnackbarMessage("")}
//       />

//       <h3 className="text-lg font-semibold mb-4">All Vouchers</h3>
//       {vouchers?.data.map((voucher) => (
//         <div key={voucher.id} className="p-2 mb-2 border-b">
//           <h4>{voucher.voucher_name}</h4>
//           <p>Code: {voucher.voucher_code}</p>
//           <button
//             onClick={() => setEditVoucher(voucher)} // Set voucher to be edited
//             className="text-blue-500"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => handleDeleteVoucher(voucher.id)}
//             className="text-red-500 ml-4"
//           >
//             Delete
//           </button>
//         </div>
//       ))}

//       <AddVoucher
//         voucherData={editVoucher} // Pass selected voucher data to AddVoucher
//         onSave={() => {
//           setEditVoucher(null); // Reset edit mode
//           refetch(); // Refresh vouchers list after save
//         }}
//       />
//     </div>
//   );
// };

// export default Vouchers;
