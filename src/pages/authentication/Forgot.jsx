import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import app from "../../firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { setLoading } from "../../app/slices/authentication/authSlice";
import Snackbar from "../../components/Snackbar";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success"); // success or error
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSnackbarMessage("Enter a valid email address");
      setSnackbarType("error");
      return;
    }
    dispatch(setLoading(true)); // Start loading state

    try {
      await sendPasswordResetEmail(auth, email);

      // Show success message
      setSnackbarMessage(
        "Password reset link has been sent. Please check your mailbox."
      );
      setSnackbarType("success");
      setEmail("");
    } catch (error) {
      console.error("Forgot password failed:", error.message);

      // Show error message
      //   setSnackbarMessage(error.message || "Signup failed!");
      //   setSnackbarType("error");
    } finally {
      dispatch(setLoading(false)); // Stop loading state
    }
  };

  return (
    <div className="h-screen flex flex-col sm:flex-row">
      {/* Snackbar Notification */}
      <Snackbar
        message={snackbarMessage}
        type={snackbarType}
        onClose={() => setSnackbarMessage("")} // Clear message on close
      />

      {/* Image Section */}
      <img
        src="https://plus.unsplash.com/premium_vector-1682269608279-c30dcfc02e95?q=80&w=1416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="restaurant"
        className="hidden sm:block w-full sm:w-1/2 h-1/2 sm:h-full object-cover"
      />

      {/* Form Section */}
      <div className="flex flex-col w-full h-full sm:w-1/2 justify-center items-center p-4 sm:p-8">
        <div className="text-xl font-semibold mb-4">Forgot Password</div>

        <form className="flex flex-col w-full max-w-sm" onSubmit={handleReset}>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Email Address"
            className="rounded p-2 m-2 mx-0 border border-gray-300 placeholder-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <button
            className="h-10 bg-blue-600 text-center m-3 mx-0 rounded text-white flex items-center justify-center"
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <TailSpin
                height="20"
                width="20"
                color="#fff"
                ariaLabel="loading"
                className="mr-2"
              />
            ) : (
              "Reset"
            )}
          </button>
        </form>

        <div className="mt-4 text-sm font-medium text-slate-700 text-center">
          Want to login?
          <span
            className="cursor-pointer text-blue-600 ml-1"
            onClick={() => navigate("/login")}
          >
            Login Now
          </span>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
