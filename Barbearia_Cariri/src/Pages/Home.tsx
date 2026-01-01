import Footer from '../components/Footer/Footer.tsx';
import Navbar from '../components/Navbar/Navbar.tsx';

import Section1 from '../components/Section1/Section1.tsx';
import Services1 from '../components/Services/Services.tsx';


function Home() {
    return (
        <>
        <Navbar />
        <Section1 />
        <Services1 />
        <Footer />
        </>
    )
}

export default Home;