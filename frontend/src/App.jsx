import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Homepage"
import LinksPage from "./pages/LinksPage";
import Preview from "./pages/Preview"; // Import the Preview component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/preview/:nickname" element={<Preview />} /> {/* Add the Preview route */}

      </Routes>
    </Router>
  );
}

export default App;
