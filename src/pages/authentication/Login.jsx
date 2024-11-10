import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  setIsRegistered,
  setIsverified,
  setLoading,
  setRestaurantId,
  setVouchers,
} from "../../app/slices/authentication/authSlice";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../../firebase";
import Snackbar from "../../components/Snackbar";
import { useGetByOwnerQuery } from "../../app/Apis/RegisterApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.isLoading);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const googleProvider = new GoogleAuthProvider();
  const userId = useSelector((state) => state.auth.user_id);
  const { data: hotelData, error } = useGetByOwnerQuery(userId, {
    skip: !userId,
  });
  // const restaurant_id = null;
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("cammee");
    dispatch(setLoading(true)); // Start loading state

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const token = await response.user.getIdToken();
      console.log(token);
      const userEmail = response.user.email;
      const userId = response.user.uid;
      console.log(userId);
      dispatch(login({ token, userEmail, userId }));

      if (hotelData && hotelData.data.length !== 0) {
        const restaurant_id = hotelData.data[0].id;
        const is_verified = hotelData.data[0].is_verified;
        const is_registered = true;

        // dispatch(login({ token, userEmail, userId, is_verified }));
        dispatch(setIsRegistered(is_registered));
        dispatch(setRestaurantId(restaurant_id));
        dispatch(setIsverified(is_verified));
        console.log("vouchers check");
        console.log(hotelData.data[0].vouchers)
        dispatch(setVouchers(hotelData.data[0].vouchers))
        navigate("/");
      } else if (hotelData && hotelData.length === 0) {
        const restaurant_id = "";
        const is_verified = false;
        const is_registered = false;

        // dispatch(login({ token, userEmail, userId, is_verified }));
        dispatch(setIsRegistered(is_registered));
        dispatch(setRestaurantId(restaurant_id));
        dispatch(setIsverified(is_verified));
        navigate("/register");
      } else if (error) {
        console.log("Failed to fetch hotel data", error);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      let errorMessage =
        "Login failed. Please check your credentials and try again.";
      if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email. Please sign up.";
      } else if (error.response && error.response.data) {
        errorMessage = `Error: ${error.response.data.message}`;
      }
      setSnackbarMessage(errorMessage);
      setSnackbarType("error");
    } finally {
      dispatch(setLoading(false)); // Stop loading state
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const userEmail = result.user.email;
      const userId = result.user.uid;
      console.log("Google user ID:", userId);

      // Fetch hotel details for Google sign-in user
      dispatch(login({ token, userEmail, userId }));

      if (hotelData && hotelData.data.length !== 0) {
        const restaurant_id = hotelData.data[0].id;
        const is_verified = hotelData.data[0].is_verified;
        const is_registered = true;

        // dispatch(login({ token, userEmail, userId, is_verified }));
        dispatch(setIsRegistered(is_registered));
        dispatch(setRestaurantId(restaurant_id));
        dispatch(setIsverified(is_verified));
        navigate("/");
      } else if (hotelData && hotelData.length === 0) {
        const restaurant_id = "";
        const is_verified = false;
        const is_registered = false;

        // dispatch(login({ token, userEmail, userId, is_verified }));
        dispatch(setIsRegistered(is_registered));
        dispatch(setRestaurantId(restaurant_id));
        dispatch(setIsverified(is_verified));
        navigate("/register");
      } else if (error) {
        console.log("Failed to fetch hotel data", error);
      }
    } catch (error) {
      console.error("Google sign-in failed:", error.message);
      alert("Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col sm:flex-row">
      {/* Image Section */}
      <Snackbar
        message={snackbarMessage}
        type={snackbarType}
        onClose={() => setSnackbarMessage("")} // Clear message on close
      />
      <img
        src="https://plus.unsplash.com/premium_vector-1682269608279-c30dcfc02e95?q=80&w=1416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="restaurant"
        className="hidden sm:block w-full sm:w-1/2 h-1/2 sm:h-full object-cover"
      />

      {/* Form Section */}
      <div className="flex flex-col w-full h-full sm:w-1/2 justify-center items-center p-4 sm:p-8">
        <div className="text-xl font-semibold mb-4">Hello! Welcome</div>

        <form className="flex flex-col w-full max-w-sm" onSubmit={handleLogin}>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="rounded p-2 m-2 mx-0 border border-gray-300 placeholder-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <label className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="rounded p-2 m-2 mx-0 border border-gray-300 placeholder-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div
            className="text-sm font-medium text-slate-700 text-right text-xs hover:cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/reset")}
          >
            Forgot Password?
          </div>
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
              "Login"
            )}
          </button>
        </form>

        <div className="text-sm font-medium text-slate-700 text-center">
          Don&apos;t have an account yet?
          <span
            className="cursor-pointer text-blue-600 ml-1"
            onClick={() => navigate("/signup")}
          >
            Signup Now
          </span>
          <div className="my-4 text-center text-gray-500">OR</div>
          <button
            className="h-10 bg-blue-600 text-center m-3 mx-0 rounded text-white flex items-center justify-center w-full max-w-sm"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <TailSpin
                height="20"
                width="20"
                color="#fff"
                ariaLabel="loading"
              />
            ) : (
              "Sign in with Google"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
