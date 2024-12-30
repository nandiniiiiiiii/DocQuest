import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";

function Home() {
    return (
        <div>
            <Navbar />
            <Hero />
            <HowItWorks/>
            <Footer/>
        </div>
    );
};

export default Home