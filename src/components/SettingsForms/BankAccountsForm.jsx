import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  usePostBankDetailsMutation,
  useGetBankDetailsQuery,
  useUpdateBankDetailsMutation,
} from "../../app/Apis/SettingsApi";
import { useSelector } from "react-redux";
import Snackbar from "../../components/Snackbar";

const BankAccountsForm = () => {
  const hotelId = useSelector((state) => state.auth.restaurant_id);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [postBankData, { isLoading: isPosting }] = usePostBankDetailsMutation();
  const [updateBankData, { isLoading: isUpdating }] =
    useUpdateBankDetailsMutation();
  const { data: existingBankData, isLoading: isFetching } =
    useGetBankDetailsQuery(hotelId);

  const [bankData, setBankData] = useState({
    accountNo: "",
    ifscCode: "",
    accountHolderName: "",
    upiId: "",
  });

  useEffect(() => {
    if (existingBankData && existingBankData.data) {
      setBankData({
        accountNo: existingBankData.data.account_number || "",
        ifscCode: existingBankData.data.ifsc_code || "",
        accountHolderName: existingBankData.data.account_name || "",
        upiId: existingBankData.data.upi_id || "",
      });
    }
  }, [existingBankData]);

  const handleChange = (e) => {
    setBankData({ ...bankData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      account_number: bankData.accountNo,
      account_name: bankData.accountHolderName,
      upi_id: bankData.upiId,
      ifsc_code: bankData.ifscCode,
    };

    try {
      if (existingBankData && existingBankData.data) {
        // PATCH request to update bank details
        await updateBankData({
          bankId: existingBankData.data.id,
          data: formattedData,
        }).unwrap();
        console.log("Bank Account Details Updated:", formattedData);
        setSnackbarMessage(
          "Bank Account Details Updated Successfully."
        );
        setSnackbarType("success");
      } else {
        // POST request to create new bank details
        await postBankData({ ...formattedData, related_id: hotelId }).unwrap();
        console.log("Bank Account Details Submitted:", formattedData);
        setSnackbarMessage("Bank Account Details Submitted Successfully.");
        setSnackbarType("success");
      }
    } catch (error) {
        setSnackbarMessage("Something went wrong, Please try again");
        setSnackbarType("error");
        console.error("Failed to submit bank details:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Snackbar
        message={snackbarMessage}
        type={snackbarType}
        onClose={() => setSnackbarMessage("")} // Clear message on close
      />
      <h2 className="text-2xl font-semibold mb-4">Bank Accounts</h2>
      {isFetching ? (
        <p>Loading bank details...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Number
            </label>
            <input
              type="text"
              name="accountNo"
              value={bankData.accountNo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Account Number"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IFSC Code
            </label>
            <input
              type="text"
              name="ifscCode"
              value={bankData.ifscCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="IFSC Code"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Holder Name
            </label>
            <input
              type="text"
              name="accountHolderName"
              value={bankData.accountHolderName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Account Holder Name"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              UPI ID
            </label>
            <input
              type="text"
              name="upiId"
              value={bankData.upiId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="UPI ID"
            />
          </div>
        </div>
      )}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition ${isPosting || isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isPosting || isUpdating}
        >
          {isPosting || isUpdating
            ? "Saving..."
            : existingBankData
              ? "Update Bank Details"
              : "Save Bank Details"}
        </button>
      </div>
    </form>
  );
};

BankAccountsForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default BankAccountsForm;
