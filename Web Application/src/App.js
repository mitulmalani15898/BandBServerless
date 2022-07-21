import { Routes, Route } from "react-router-dom";

import Rooms from "./hotel/Rooms";
import UserRoomBookings from "./hotel/UserRoomBookings";
import Preferences from "./Recommendations/Preferences";
import Pass from "./Recommendations/Pass";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Visualization from "./components/Visualization/Visualization";
import Report from "./components/Visualization/Report";
import NavbarComponent from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import Feedback from "./components/Feedback/Feedback";

const App = () => {
  return (
    <>
      <NavbarComponent />
      <div className="App" style={{ paddingBottom: "50px" }}>
        <Routes>
          <Route exact path="/" element={<Rooms />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/rooms" element={<Rooms />} />
          <Route exact path="/user/bookings" element={<UserRoomBookings />} />
          <Route exact path="/preferences" element={<Preferences />} />
          <Route exact path="/pass" element={<Pass />} />
          <Route exact path="/feedback" element={<Feedback />} />
          <Route exact path="/visualization" element={<Visualization />} />
          <Route exact path="/report" element={<Report />} />
          <Route exact path="*" element={<div>404, Page Not Found!</div>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
