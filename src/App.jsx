import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  // useNavigate,
} from "react-router-dom";
import Dishes from "./pages/Home/Dishes";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import Orders from "./pages/Home/Orders";
import Dashboard from "./pages/Home/Dashboard";
import RegistrationSuccess from "./pages/authentication/RegistrationSuccess";
// import Settings from "./pages/Home/Settings";
import { useDispatch, useSelector } from "react-redux";
import Registration from "./pages/authentication/Registration";
import AccountSettings from "./pages/Home/AccountSettings";
import HelpCenter from "./pages/Home/Help";
import AddDishForm from "./pages/Home/AddDishForm";
import { useEffect } from "react";
import axiosInstance from "./axiosInstance";
import { setIsRegistered } from "./app/slices/authentication/authSlice";
import { setIsverified } from "./app/slices/authentication/authSlice";
import { setRestaurantId } from "./app/slices/authentication/authSlice";
import Forgot from "./pages/authentication/Forgot";
// import { fetchRestaurantData } from "./features/restaurant/registerSlice";

function App() {
  const token = useSelector((state) => state.auth.token);
  const isRegistered = useSelector((state) => state.auth.is_registered);
  const isVerified = useSelector((state) => state.auth.is_verified);
  const userId = useSelector((state) => state.auth.user_id);
  console.log(isRegistered);
  console.log(isVerified);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && userId && isVerified == false) {
      const fetchHotelVerificationStatus = async () => {
        try {
          const hotelResponse = await axiosInstance.get("/v1/hotels/", {
            params: {
              owner_id: userId, // Pass userId as owner_id in query parameters
            },
            headers: {
              token: token, // Include the token in headers
            },
          });
          if (hotelResponse.status === 200) {
            console.log(
              "Data retrieved successfully:",
              hotelResponse.data.data
            );
            const hotelData = hotelResponse.data.data;

            if (hotelData.length != 0) {
              const restaurant_id = hotelData[0].id;
              const is_verified = hotelData[0].is_verified;
              const is_registered = true;

              // dispatch(login({ token, userEmail, userId, is_verified }));
              dispatch(setIsRegistered(is_registered));
              dispatch(setRestaurantId(restaurant_id));
              dispatch(setIsverified(is_verified));
            } else {
              const restaurant_id = "";
              const is_verified = false;
              const is_registered = false;
              // dispatch(login({ token, userEmail, userId, is_verified }));
              dispatch(setIsRegistered(is_registered));
              dispatch(setRestaurantId(restaurant_id));
              dispatch(setIsverified(is_verified));
            }
          } else {
            console.log("Unexpected response status:", hotelResponse.status);
          }
        } catch (error) {
          console.error("Error fetching hotel verification status", error);
        }
      };

      fetchHotelVerificationStatus();
    }
  }, [token, userId, dispatch]);

  // Helper functions to handle navigation conditions
  const redirectToLogin = !token ? <Navigate to="/login" /> : null;

  const redirectToRegister =
    token && !isRegistered ? <Navigate to="/register" /> : null;
  const redirectToSuccess =
    token && isRegistered && !isVerified ? <Navigate to="/success" /> : null;
  const redirectToDashboard =
    token && isVerified ? <Navigate to="/dashboard" /> : null;

  // Function to handle private route logic
  const handlePrivateRoute = (Component) => {
    if (!token) return <Navigate to="/login" />;
    if (!isRegistered) return <Navigate to="/register" />;
    if (!isVerified) return <Navigate to="/success" />;
    return <Component />;
  };

  return (
    <div>
      <Router>
        <Routes>
          {/* Root Route */}
          <Route
            path="/"
            element={
              redirectToLogin ||
              redirectToRegister ||
              redirectToSuccess ||
              redirectToDashboard
            }
          />

          {/* Success Route */}
          <Route
            path="/success"
            element={
              token && isRegistered && !isVerified ? (
                <RegistrationSuccess />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Authentication Routes */}
          <Route
            path="/login"
            element={
              !token ? (
                <Login />
              ) : (
                redirectToDashboard || redirectToSuccess || redirectToRegister
              )
            }
          />
          <Route
            path="/signup"
            element={
              !token ? (
                <Signup />
              ) : (
                redirectToDashboard || redirectToSuccess || redirectToRegister
              )
            }
          />

          <Route
            path="/reset"
            element={
              !token ? (
                <Forgot></Forgot>
              ) : (
                redirectToDashboard || redirectToSuccess || redirectToRegister
              )
            }
          />

          {/* Registration Route */}
          <Route
            path="/register"
            element={
              !token ? (
                <Navigate to="/login" />
              ) : !isRegistered ? (
                <Registration />
              ) : (
                redirectToDashboard || redirectToSuccess
              )
            }
          />

          {/* Protected Routes */}
          <Route path="/dashboard" element={handlePrivateRoute(Dashboard)} />
          <Route path="/orders" element={handlePrivateRoute(Orders)} />
          <Route path="/manage" element={handlePrivateRoute(Dishes)} />
          <Route path="/add" element={handlePrivateRoute(AddDishForm)} />
          <Route
            path="/settings"
            element={handlePrivateRoute(AccountSettings)}
          />
          <Route path="/help" element={handlePrivateRoute(HelpCenter)} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
