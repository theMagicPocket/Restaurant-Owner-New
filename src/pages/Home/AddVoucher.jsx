import { useState } from "react";

const AddVoucher = ({ onClose }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    discountType: "Percentage",
    discountValue: "",
    maxDiscount: "",
    minOrderValue: "",
    startDate: "",
    endDate: "",
    usageLimitPerCustomer: "",
    totalVoucherLimit: "",
    description: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for handling form submission, like sending the data to an API
    console.log(formData);
    onClose(); // Close the form after submission
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Add New Voucher</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Voucher Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Voucher Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Discount Type</label>
          <select
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="Percentage">Percentage</option>
            <option value="Fixed">Fixed Amount</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Discount Value</label>
          <input
            type="text"
            name="discountValue"
            value={formData.discountValue}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Max Discount</label>
          <input
            type="text"
            name="maxDiscount"
            value={formData.maxDiscount}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Min Order Value</label>
          <input
            type="text"
            name="minOrderValue"
            value={formData.minOrderValue}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">
            Usage Limit Per Customer
          </label>
          <input
            type="number"
            name="usageLimitPerCustomer"
            value={formData.usageLimitPerCustomer}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Total Voucher Limit</label>
          <input
            type="number"
            name="totalVoucherLimit"
            value={formData.totalVoucherLimit}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          rows={3}
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700">Voucher Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Paused">Paused</option>
        </select>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-red-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Voucher
        </button>
      </div>
    </form>
  );
};

export default AddVoucher;
