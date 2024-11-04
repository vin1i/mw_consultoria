import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Error from "../pages/Error";
import ImobiList from "../pages/ImobiList";
import Admin from "../pages/Admin";

const isAuthenticated = () => localStorage.getItem("token") === "c91d8f3e-7a9f-4b33-a3f5-9b4d5e7f2c29";

const RouterApp = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imoveis" element={<ImobiList />} />
        
        <Route
          path="/admin"
          element={isAuthenticated() ? <Admin /> : <Navigate to="/erro" />}
        />
        
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default RouterApp;
