import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import Header from "./components/Header";
const Home = lazy(() => import("./pages/Home"));
const Help = lazy(() => import("./pages/Help"));
const GrowYoutube = lazy(() => import("./pages/GrowYoutube"));
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <RouteBasedTitleUpdater />
      <Suspense>
        <div className="app">
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="help" element={<Help />} />
            <Route path="grow-youtube" element={<GrowYoutube />} />
            <Route path="watch" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </Suspense>
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
