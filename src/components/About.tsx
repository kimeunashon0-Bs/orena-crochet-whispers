const About = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-secondary/30 to-background" id="about">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          <span className="text-primary text-5xl md:text-6xl">A</span>bout <span className="text-primary text-5xl md:text-6xl">O</span>rena
        </h2>
        
        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-foreground/90">
          <p>
            Welcome to Orena, where every piece is crafted with a mission to help you rediscover your spark 
            and embrace your confidence. Each item is lovingly handmade with premium yarns, creating unique 
            crochet pieces that celebrate your beauty, individuality, and strength.
          </p>
          
          <p>
            I am passionate about empowering women to feel confident and beautiful in their own skin. 
            Through my handcrafted creations, I believe every person deserves to feel special and express 
            their unique style. Whether it&apos;s a vibrant bikini set, an elegant dress, or a cozy accessory, 
            each piece is designed to help you shine and reclaim your self-esteem.
          </p>
          
          <p>
            From helping you find that perfect piece that makes you feel unstoppable, to creating custom 
            designs that reflect your personality - every stitch is made with love and the intention to 
            help you feel amazing.
          </p>
          
          <p className="text-2xl md:text-3xl font-bold text-primary pt-6">
            Empowering confidence, one stitch at a time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
