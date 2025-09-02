import About from "./_components/About";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";
import Services from "./_components/Services";
import Works from "./_components/Works";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Works />
      <Contact />
      <Footer />
    </>
  );
}
