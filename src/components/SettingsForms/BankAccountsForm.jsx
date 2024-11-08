import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  usePostBankDetailsMutation,
  useGetBankDetailsQuery,
} from "../../app/Apis/SettingsApi";

const BankAccountsForm = () => {
  const [postBankData, { isLoading: isPosting }] = usePostBankDetailsMutation();
  const { data: existingBankData, isLoading: isFetching } =
    useGetBankDetailsQuery("672d58b755026e8b9447deed");
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
      related_id: "test_related_id", // Replace with the appropriate ID
    };

    try {
      const response = await postBankData(formattedData).unwrap();
      console.log("Response:", response);
      console.log("Bank Account Details Submitted:", formattedData);
    } catch (error) {
      console.error("Failed to submit bank details:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          className={`bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition ${isPosting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isPosting}
        >
          {isPosting
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
