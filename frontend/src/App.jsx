import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EquipmentList from "./pages/EquipmentList";
import MyRequests from "./pages/MyRequests";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ManageRequests from "./pages/ManageRequests";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      {token && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/equipment"
          element={token ? <EquipmentList /> : <Navigate to="/" />}
        />
        <Route
          path="/requests"
          element={token ? <MyRequests /> : <Navigate to="/" />}
        />
        <Route path="/manage-requests" element={token ? <ManageRequests /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

