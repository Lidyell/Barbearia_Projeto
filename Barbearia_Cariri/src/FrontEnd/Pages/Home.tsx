import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import Introduction from "../components/Introduction/Introduction.tsx";
import Cards_Services from "../components/Cards/Cards.tsx";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen.tsx";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.tsx";



function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}

      <div className={`page ${loading ? "hidden" : "show"}`}>
        <Navbar />
        <ScrollToTop />
        <Introduction />
        <Cards_Services />
        <Footer />
        

      </div>
    </>
  );
}

export default Home;
