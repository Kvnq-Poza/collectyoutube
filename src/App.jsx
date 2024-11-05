import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Footer from "./components/Footer";
import "./App.css";
import GrowYoutube from "./pages/GrowYoutube";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="help" element={<Help />} />
          <Route path="grow-youtube" element={<GrowYoutube />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
