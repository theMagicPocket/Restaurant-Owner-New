import { useState } from "react";
import PropTypes from "prop-types";

const TimeField = ({ label, id, name, onChange, value, error }) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type="time"
      name={name}
      id={id}
      value={value}
      className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      onChange={onChange}
    />
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);

TimeField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string, // Error prop for error message
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const RestaurantSettingsForm = () => {
  const [restaurantData, setRestaurantData] = useState(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: { openingHours: "", closingHours: "" },
      }),
      {}
    )
  );
  const [errors, setErrors] = useState({});
  console.log(setErrors)
  
  const handleChange = (e, day) => {
    const { name, value } = e.target;
    setRestaurantData({
      ...restaurantData,
      [day]: {
        ...restaurantData[day],
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Restaurant Settings Submitted:", restaurantData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Restaurant Settings</h2>
      {daysOfWeek.map((day) => (
        <div key={day} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <h3 className="col-span-1 md:col-span-2 text-lg font-semibold mb-2">
            {day}
          </h3>
          <TimeField
            label={`Opening Hours (${day})`}
            name="openingHours"
            id={`opening-hours-${day}`}
            value={restaurantData[day].openingHours}
            onChange={(e) => handleChange(e, day)}
            error={errors[day]?.openingHours}
          />
          <TimeField
            label={`Closing Hours (${day})`}
            name="closingHours"
            id={`closing-hours-${day}`}
            value={restaurantData[day].closingHours}
            onChange={(e) => handleChange(e, day)}
            error={errors[day]?.closingHours}
          />
        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
        >
          Save Restaurant Settings
        </button>
      </div>
    </form>
  );
};

RestaurantSettingsForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default RestaurantSettingsForm;
