import { Routes, Route } from "react-router-dom";
import "./App.css";
import Preferences from "./Recommendations/Preferences";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/preferences" element={<Preferences />} />
      </Routes>
    </div>
  );
}

export default App;
