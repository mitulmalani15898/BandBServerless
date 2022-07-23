import { Routes, Route } from "react-router-dom";
import Rooms from "./hotel/Rooms";
import UserRoomBookings from "./hotel/UserRoomBookings";
import Preferences from "./Recommendations/Preferences";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Visualization from "./components/Visualization/Visualization";
import Report from "./components/Visualization/Report";
import NavbarComponent from "./components/Navbar";
import LexChat from "react-lex-plus";

const App = () => {
  return (
    <>
      <NavbarComponent />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Rooms />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/rooms" element={<Rooms />} />
          <Route exact path="/user/bookings" element={<UserRoomBookings />} />
          <Route exact path="/preferences" element={<Preferences />} />
          <Route exact path="/visualization" element={<Visualization />} />
          <Route exact path="/report" element={<Report />} />
          <Route exact path="*" element={<div>404, Page Not Found!</div>} />
        </Routes>
        <LexChat
        botName="BnBL"
        IdentityPoolId="us-east-1:7bad2544-eb75-46f5-b0bd-3b42296e4ff9"
        placeholder="Placeholder text"
        backgroundColor="#FFFFFF"
        height="430px"
        region="us-east-1"
        headerText="Online support"
        headerStyle={{ backgroundColor: "#ABD5D9", fontSize: "30px" }}
        greeting={
          "Hello, how can I help? You can say things like 'help' to get more info"
        }
      />
      </div>
    </>
  );
};

export default App;
