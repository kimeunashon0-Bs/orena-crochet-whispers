import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah K.",
    location: "Nairobi",
    text: "Wearing Orena's pieces makes me feel so confident! The quality is exceptional and I finally feel like myself again. Thank you for helping me find my spark!",
    rating: 5,
  },
  {
    id: 2,
    name: "Emily M.",
    location: "Mombasa",
    text: "I struggled with self-esteem for years, but when I put on my multicolor dress, I felt beautiful and powerful. Orena's work is truly empowering!",
    rating: 5,
  },
  {
    id: 3,
    name: "Jessica T.",
    location: "Kisumu",
    text: "More than just beautiful pieces - they make you feel amazing! The craftsmanship and care in every stitch shows. I feel confident and ready to conquer the world!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-background via-muted/30 to-background" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary text-5xl md:text-6xl">W</span>hat 
            <span className="text-primary text-5xl md:text-6xl"> O</span>ur Customers Say
          </h2>
          <p className="text-xl text-muted-foreground italic">
            "Helping you rediscover your confidence and inner beauty"
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-gold-hover transition-smooth hover:-translate-y-2 border border-border"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-foreground mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-2xl font-semibold text-primary mb-2">
            Join Our Happy Customers
          </p>
          <p className="text-muted-foreground">
            Experience the beauty of handcrafted crochet artistry
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
