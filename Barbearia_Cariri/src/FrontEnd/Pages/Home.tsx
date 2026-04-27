import Footer from "../components/Footer/Footer.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";

import Section1 from "../components/Introduction/Introduction.tsx";
import Services1 from "../components/Cards/Cards.tsx";

function Home() {
  return (
    <>
      <Navbar />
      <Section1 />
      <Services1 />
      <Footer />
    </>
  );
}

export default Home;
