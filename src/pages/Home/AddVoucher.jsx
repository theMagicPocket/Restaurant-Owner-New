import { useState } from "react";
import { usePostVoucherMutation } from "../../app/Apis/FoodApi";
import { useSelector } from "react-redux";
import Snackbar from "../../components/Snackbar";
import { TailSpin } from "react-loader-spinner";

const AddVoucher = ({ onClose }) => {
  const [formData, setFormData] = useState({
    voucher_code: "",
    voucher_name: "",
    percentage: "",
    max_discount_amt: "",
    min_cart_value: "",
    endDate: "", // Will include both date and time
    per_user_usage_limit: "",
    usage_limit: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const restaurant_id = useSelector((state) => state.auth.restaurant_id);

  // Get the postVoucher mutation
  const [postVoucher, { isLoading }] = usePostVoucherMutation();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when user types
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.voucher_code)
      newErrors.voucher_code = "Voucher code is required.";
    if (!formData.voucher_name)
      newErrors.voucher_name = "Voucher name is required.";
    if (!formData.percentage)
      newErrors.percentage = "Discount percentage is required.";
    if (!formData.max_discount_amt)
      newErrors.max_discount_amt = "Max discount is required.";
    if (!formData.min_cart_value)
      newErrors.min_cart_value = "Min order value is required.";
    if (!formData.endDate)
      newErrors.endDate = "End date and time are required.";
    if (!formData.per_user_usage_limit)
      newErrors.per_user_usage_limit = "Usage limit per customer is required.";
    if (!formData.usage_limit)
      newErrors.usage_limit = "Total voucher limit is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Construct the data object according to the API format
    const dataToSend = {
      voucher_name: formData.voucher_name,
      description: formData.description,
      voucher_code: formData.voucher_code,
      min_cart_value: parseInt(formData.min_cart_value),
      percentage: parseInt(formData.percentage),
      max_discount_amt: parseInt(formData.max_discount_amt),
      validity: formData.endDate, // Ensure endDate is formatted with both date and time
      per_user_usage_limit: parseInt(formData.per_user_usage_limit),
      usage_limit: parseInt(formData.usage_limit),
      type: "HOTEL", // Assuming this is always the case
      id: restaurant_id,
    };

    try {
      // Call the mutation to post voucher
      await postVoucher(dataToSend).unwrap();
      setSnackbarMessage("Voucher added successfully");
      setSnackbarType("success");
      setFormData({
        voucher_code: "",
        voucher_name: "",
        percentage: "",
        max_discount_amt: "",
        min_cart_value: "",
        endDate: "", // Resetting date and time
        per_user_usage_limit: "",
        usage_limit: "",
        description: "",
      });
      // onClose();
    } catch (error) {
      setSnackbarMessage("Failed to add voucher, Please try again.");
      setSnackbarType("error");
      console.error("Failed to add voucher:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <Snackbar
        message={snackbarMessage}
        type={snackbarType}
        onClose={() => setSnackbarMessage("")} // Clear message on close
      />
      <h3 className="text-lg font-semibold mb-4">Add New Voucher</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Form fields */}
        <div>
          <label className="block text-gray-700">Voucher Code</label>
          <input
            type="text"
            name="voucher_code"
            value={formData.voucher_code}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.voucher_code && (
            <p className="text-red-500 text-sm">{errors.voucher_code}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Voucher Name</label>
          <input
            type="text"
            name="voucher_name"
            value={formData.voucher_name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.voucher_name && (
            <p className="text-red-500 text-sm">{errors.voucher_name}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Discount Percentage</label>
          <input
            type="text"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.percentage && (
            <p className="text-red-500 text-sm">{errors.percentage}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Max Discount</label>
          <input
            type="text"
            name="max_discount_amt"
            value={formData.max_discount_amt}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.max_discount_amt && (
            <p className="text-red-500 text-sm">{errors.max_discount_amt}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Min Order Value</label>
          <input
            type="text"
            name="min_cart_value"
            value={formData.min_cart_value}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.min_cart_value && (
            <p className="text-red-500 text-sm">{errors.min_cart_value}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">End Date and Time</label>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">
            Usage Limit Per Customer
          </label>
          <input
            type="number"
            name="per_user_usage_limit"
            value={formData.per_user_usage_limit}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.per_user_usage_limit && (
            <p className="text-red-500 text-sm">
              {errors.per_user_usage_limit}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Total Voucher Limit</label>
          <input
            type="number"
            name="usage_limit"
            value={formData.usage_limit}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.usage_limit && (
            <p className="text-red-500 text-sm">{errors.usage_limit}</p>
          )}
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
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-red-600"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {isLoading ? (
            <TailSpin
              height="20"
              width="20"
              color="#fff"
              ariaLabel="loading"
              className="mr-2"
            />
          ) : (
            "Add Voucher"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddVoucher;
