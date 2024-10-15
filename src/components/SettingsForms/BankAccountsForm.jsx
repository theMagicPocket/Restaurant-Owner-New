import { useState } from "react";
import PropTypes from "prop-types";

const BankAccountsForm = () => {
  const [bankData, setBankData] = useState({
    accountNo: "",
    ifscCode: "",
    accountHolderName: "",
    upiId: "",
  });

  const handleChange = (e) => {
    setBankData({ ...bankData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bank Account Details Submitted:", bankData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Bank Accounts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Account Number */}
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

        {/* IFSC Code */}
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

        {/* Account Holder Name */}
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

        {/* UPI ID */}
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

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
        >
          Save Bank Details
        </button>
      </div>
    </form>
  );
};

BankAccountsForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default BankAccountsForm;
