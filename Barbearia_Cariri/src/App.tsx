import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Routes/Routes.tsx";
import Navbar from "./FrontEnd/components/Navbar/Navbar.tsx";
import Footer from './FrontEnd/components/Footer/Footer';
import ScrollToTop from "./FrontEnd/components/ScrollToTop/ScrollToTop.tsx";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
      <ScrollToTop/>
      <Footer/>

    </BrowserRouter>
  );
}

export default App;
