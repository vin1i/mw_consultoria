import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Error from "../pages/Error";
import ImobiList from "../pages/ImobiList";
import Admin from "../pages/Admin";
import ImobiDetails from "../components/ImovelDetail";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token && token.length > 0;
};

const RouterApp = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imoveis" element={<ImobiList />} />

        <Route path="/imoveis/:id" element={<ImobiDetails />} />

        <Route
          path="/admin"
          element={isAuthenticated() ? <Admin /> : <Navigate to="/erro" />}
        />

        <Route path="/erro" element={<Error />} />
        <Route path="*" element={<Navigate to="/erro" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default RouterApp;
