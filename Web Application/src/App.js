import Rooms from "./hotel/Rooms";
import UserRoomBookings from "./hotel/UserRoomBookings";
import { Routes, Route, Navigate } from "react-router-dom";
import Preferences from "./Recommendations/Preferences";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import { isLoggedIn } from "./utility/common";

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace={true} />;
};

const PublicRoute = ({ children }) => {
  return isLoggedIn() ? (
    <Navigate to="/preferences" replace={true} />
  ) : (
    children
  );
};

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PublicRoute>
              <Rooms />
            </PublicRoute>
          }
        />
        <Route path="/preferences" element={<Preferences />} />
        <Route
          exact
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          exact
          path="/rooms"
          element={
            <PublicRoute>
              <Rooms />
            </PublicRoute>
          }
        />

        <Route
          exact
          path="/user/bookings"
          element={
            <PublicRoute>
              <UserRoomBookings />
            </PublicRoute>
          }
        />

        <Route exact path="/user/bookings" element={<UserRoomBookings />} />
        <Route exact path="*" element={<div>404, Page Not Found!</div>} />
      </Routes>
    </div>
  );
};

export default App;
