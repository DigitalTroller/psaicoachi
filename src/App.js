import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SurveyForm from "./components/SurveyForm";
import Wheel from "./components/Wheel";
import "./index.css"; // Global styles

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SurveyForm />} />
        <Route path="/wheel" element={<Wheel />} />
      </Routes>
    </Router>
  );
};

export default App;
