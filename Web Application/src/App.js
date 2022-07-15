import { Routes, Route } from "react-router-dom";
import "./App.css";
import Rooms from "./hotel/Rooms";
import UserRoomBookings from "./hotel/UserRoomBookings";
import Preferences from "./Recommendations/Preferences";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/" element={<Rooms />} />
        <Route path="/user/bookings" element={<UserRoomBookings />} />
        
      </Routes>
    </div>
  );
}

export default App;
