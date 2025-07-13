import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import MyCalendar from "./components/MyCalendar";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("auth", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Routes>
        <Route
          path="/Appointment-Calendar"
          element={
            isAuthenticated ? (
              <Navigate to="/Appointment-Calendar/calendar" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/Appointment-Calendar/calendar"
          element={
            isAuthenticated ? (
              <MyCalendar onLogout={handleLogout} />
            ) : (
              <Navigate to="/Appointment-Calendar" />
            )
          }
        />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
