import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import ImobiList from "../pages/ImobiList";
import ImobiDetails from "../components/ImovelDetail";
import PropertyPage from "../pages/Admin/PropertyPage"; // Página de administração de imóveis
import Error from "../pages/Error"; // Página de erro
import Header from "../components/Header";
import Footer from "../components/Footer";

const RouterApp = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imoveis" element={<ImobiList />} />
        <Route path="/imoveis/:id" element={<ImobiDetails />} />

        <Route path="/admin/imoveis" element={<PropertyPage />} />

        <Route path="/erro" element={<Error />} />
        <Route path="*" element={<Navigate to="/erro" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default RouterApp;
