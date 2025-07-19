import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Pricing from "./Pages/Pricing";
import AboutUs from "./Pages/AboutUs";
import Rent from "./Pages/Rent";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import ContactPage from "./Pages/ContactPage";
import { useState } from "react";

function App() {
  const [openRide, setOpenRide] = useState<any>(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar setOpenRide={setOpenRide} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<AboutUs />} />
            <Route
              path="/rent"
              element={<Rent openRide={openRide} setOpenRide={setOpenRide} />}
            />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
