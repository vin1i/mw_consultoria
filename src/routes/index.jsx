import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Error from "../pages/Error";
import Imobi from "../pages/Imobi";

const RouterApp = () => {
  return (
      <BrowserRouter>
      <Header />
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/imovel" element={<Imobi />}/>
            <Route path="*" element={<Error />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
  );
};

export default RouterApp;
