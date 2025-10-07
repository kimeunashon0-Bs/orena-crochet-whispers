import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import StyleGallery from "@/components/StyleGallery";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Products />
      <StyleGallery />
      <Testimonials />
      <About />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
