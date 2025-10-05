import heroImage from "@/assets/hero-section.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 animate-fade-in">
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
    </section>
  );
};

export default Hero;
