import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import StyleGallery from "@/components/StyleGallery";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import EmailCapturePopup from "@/components/EmailCapturePopup";

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
      <EmailCapturePopup />
    </div>
  );
};

export default Index;
