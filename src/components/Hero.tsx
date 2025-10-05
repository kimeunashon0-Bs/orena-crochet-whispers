import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import heroSection from "@/assets/hero-section.jpg";
import heroCrochet from "@/assets/hero-crochet.jpg";

const heroImages = [
  heroSection,
  heroCrochet,
];

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {heroImages.map((image, index) => (
            <div key={index} className="embla__slide relative h-screen flex-[0_0_100%]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] ease-out"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white font-serif">
            <span className="text-primary text-6xl md:text-8xl lg:text-9xl drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]">O</span>rena
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white max-w-3xl mx-auto leading-relaxed mb-4">
            Handcrafted Crochet Pieces Made with Love & Creativity
          </p>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto italic">
            "Empowering you to find your spark and embrace your confidence"
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
