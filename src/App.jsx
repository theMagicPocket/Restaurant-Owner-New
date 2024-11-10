import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dishes from "./pages/Home/Dishes";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import Orders from "./pages/Home/Orders";
import Dashboard from "./pages/Home/Dashboard";
import RegistrationSuccess from "./pages/authentication/RegistrationSuccess";
import { useDispatch, useSelector } from "react-redux";
import Registration from "./pages/authentication/Registration";
import AccountSettings from "./pages/Home/AccountSettings";
import HelpCenter from "./pages/Home/Help";
import AddDishForm from "./pages/Home/AddDishForm";
import { useEffect } from "react";
// import axiosInstance from "./axiosInstance";
import { setIsRegistered } from "./app/slices/authentication/authSlice";
import { setIsverified } from "./app/slices/authentication/authSlice";
import { setRestaurantId } from "./app/slices/authentication/authSlice";
import Forgot from "./pages/authentication/Forgot";
import { useGetByOwnerQuery } from "./app/Apis/RegisterApi";
import Vouchers from "./pages/Home/Vouchers";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import app from "./firebase";
import { login } from "./app/slices/authentication/authSlice";
// import axiosInstance from "./axiosInstance";
function App() {
  const token = useSelector((state) => state.auth.token);
  const isRegistered = useSelector((state) => state.auth.is_registered);
  const isVerified = useSelector((state) => state.auth.is_verified);
  const userId = useSelector((state) => state.auth.user_id);
  console.log(isRegistered);
  console.log(isVerified);
  const dispatch = useDispatch();
  const {
    data: hotelData,
    error,
    isLoading,
    isSuccess,
  } = useGetByOwnerQuery(userId, {
    skip: !token || !userId, // Skip fetching if conditions are not met
    refetchOnMountOrArgChange: true, // Refetch data when the component mounts or args change
    refetchOnFocus: true, // Optional: Refetch data when the window regains focus
  });
  console.log("outside");
  console.log(hotelData);

    const auth = getAuth(app);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Refresh the token whenever the user state changes
          const token = await user.getIdToken(true); // true forces a refresh of the token
          const userEmail = user.email;
          const userId = user.uid;

          dispatch(login({ token, userEmail, userId }));
        }
      });

      return () => unsubscribe();
    }, [auth, dispatch]);


  useEffect(() => {
    console.log("Token:", token);
    console.log("User ID:", userId);
    console.log("Is Verified:", isVerified);
    console.log("Skip Query:", !token || !userId || isVerified === true);

    if (isSuccess && hotelData && userId) {
      // If hotel data is retrieved successfully
      console.log("useGetByOwnerQuery Api");
      console.log(hotelData);
      if (hotelData.data.length !== 0) {
        const restaurant_id = hotelData.data[0].id;
        const is_verified = hotelData.data[0].is_verified;
        const is_registered = true;

        dispatch(setIsRegistered(is_registered));
        dispatch(setRestaurantId(restaurant_id));
        dispatch(setIsverified(is_verified));
      } else {
        console.log("cameeeeeeeeeeeeeeee");
        const restaurant_id = "";
        const is_verified = false;
        const is_registered = false;

        dispatch(setIsRegistered(is_registered));
        dispatch(setRestaurantId(restaurant_id));
        dispatch(setIsverified(is_verified));
      }
    } else if (error) {
      console.error("Error fetching hotel verification status", error);
    }
  }, [isSuccess, hotelData, error, dispatch]);

  if (isLoading) return <p>Loading hotel verification status...</p>;
  if (error) return <p>Error loading hotel verification status</p>;

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
          <Route path="/edit/:id" element={handlePrivateRoute(AddDishForm)} />
          <Route
            path="/settings"
            element={handlePrivateRoute(AccountSettings)}
          />
          <Route path="/help" element={handlePrivateRoute(HelpCenter)} />
          <Route path="/vouchers" element={handlePrivateRoute(Vouchers)} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
