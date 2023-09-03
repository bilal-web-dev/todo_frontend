import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import "./styles/App.css";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { server, Context } from "./main";

function App() {

  const { setIsAuthenticated } = useContext(Context);

  useEffect(() => {
    getAuth();
  }, []);

  const getAuth = async () => {
    try {
      const { data } = await axios.get(`${server}/api/users/me`, {
        withCredentials: true,
      });

      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  return (
    <Router>
      <Header />
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
