import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Snackbar = ({ message, type, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-3 rounded-lg shadow-lg z-50 flex items-center justify-between
        ${type === "success" ? "bg-green-500" : "bg-red-500"} 
        text-white 
        w-11/12 max-w-sm 
        sm:p-4 sm:text-base text-sm
        `}
    >
      <span>{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
        className="ml-4 text-lg font-bold"
      >
        &times;
      </button>
    </div>
  );
};

// PropTypes validation
Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

export default Snackbar;
