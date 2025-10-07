import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p10 from "@/assets/p10.jpg";
import p11 from "@/assets/p11.jpg";

interface GalleryItem {
  id: number;
  image: string;
  clientName: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: p1,
    clientName: "Back Lace-Up Elegance",
    description: "Stunning beaded crop tops with beautiful back lace-up details, paired with sleek palazzo pants"
  },
  {
    id: 2,
    image: p2,
    clientName: "Beach Vibes",
    description: "Gorgeous green crochet bikini top perfect for tropical adventures and poolside confidence"
  },
  {
    id: 3,
    image: p4,
    clientName: "Rainbow Radiance",
    description: "Eye-catching multicolor striped halter top that brings joy and vibrant energy"
  },
  {
    id: 4,
    image: p5,
    clientName: "Squad Goals",
    description: "Our beautiful clients showcasing a stunning collection of colorful crochet swimwear and beachwear"
  },
  {
    id: 5,
    image: p6,
    clientName: "Group Glam",
    description: "Five gorgeous styles from pink fringe to yellow elegance - every piece tells a story"
  },
  {
    id: 6,
    image: p7,
    clientName: "Yellow Dream",
    description: "Elegant yellow crochet dress that flows beautifully, perfect for any special occasion"
  },
  {
    id: 7,
    image: p10,
    clientName: "Orange Sunset",
    description: "Bold orange crochet bikini set that radiates confidence and summer vibes"
  },
  {
    id: 8,
    image: p11,
    clientName: "Feathered Fantasy",
    description: "Show-stopping orange dress with feather details - glamour meets handcrafted artistry"
  },
];

const StyleGallery = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Style Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our beautiful clients rock our handcrafted pieces
          </p>
        </div>

        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {galleryItems.map((item, index) => (
            <div key={item.id} className="flex">
              <div
                className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-gold-hover transition-smooth hover:-translate-y-2 flex flex-col h-full w-full"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="relative h-[500px] overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.clientName}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                </div>

                <div className="p-6 text-center flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-smooth">
                      {item.clientName}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StyleGallery;
