import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Footer from "./components/Footer";
import "./App.css";
import GrowYoutube from "./pages/GrowYoutube";
import { useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <RouteBasedTitleUpdater />
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="help" element={<Help />} />
          <Route path="grow-youtube" element={<GrowYoutube />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function RouteBasedTitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "CollectYoutube | Free YouTube Video Downloader";
        break;
      case "/help":
        document.title = "Help - CollectYoutube";
        break;
      case "/grow-youtube":
        document.title = "Grow Your YouTube Channel - CollectYoutube";
        break;
      default:
        document.title = "CollectYoutube | Free YouTube Video Downloader";
    }
  }, [location]);

  return null;
}

export default App;
