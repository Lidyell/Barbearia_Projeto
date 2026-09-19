import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./routes/Routes";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
      <ScrollToTop />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
