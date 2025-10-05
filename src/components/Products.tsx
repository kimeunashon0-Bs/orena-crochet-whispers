import ProductCard from "./ProductCard";
import blueBikini from "@/assets/blue-bikini.jpg";
import redPearlDress from "@/assets/red-pearl-dress.jpg";
import orangeBikini from "@/assets/orange-bikini.jpg";
import multicolorDress from "@/assets/multicolor-dress.jpg";
import purpleTop from "@/assets/purple-top.jpg";
import greyBeanie from "@/assets/grey-beanie.jpg";

const products = [
  {
    id: 1,
    image: blueBikini,
    name: "Crochet Bikini Set - Blue",
    whatsappMessage: "Hi! I'm interested in the Crochet Bikini Set - Blue from Orena. Could you please share the price and availability?"
  },
  {
    id: 2,
    image: redPearlDress,
    name: "Pearl Crochet Dress - Red",
    whatsappMessage: "Hi! I'm interested in the Pearl Crochet Dress - Red from Orena. Could you please share the price and availability?"
  },
  {
    id: 3,
    image: orangeBikini,
    name: "Crochet Bikini Set - Orange",
    whatsappMessage: "Hi! I'm interested in the Crochet Bikini Set - Orange from Orena. Could you please share the price and availability?"
  },
  {
    id: 4,
    image: multicolorDress,
    name: "Multicolor Crochet Dress",
    whatsappMessage: "Hi! I'm interested in the Multicolor Crochet Dress from Orena. Could you please share the price and availability?"
  },
  {
    id: 5,
    image: purpleTop,
    name: "Ruffled Crochet Top - Purple",
    whatsappMessage: "Hi! I'm interested in the Ruffled Crochet Top - Purple from Orena. Could you please share the price and availability?"
  },
  {
    id: 6,
    image: greyBeanie,
    name: "Crochet Beanie - Grey",
    whatsappMessage: "Hi! I'm interested in the Crochet Beanie - Grey from Orena. Could you please share the price and availability?"
  }
];

const Products = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16" id="products">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-primary text-5xl md:text-6xl">O</span>ur Collection
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product) => (
            <div key={product.id} className="animate-fade-in">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
