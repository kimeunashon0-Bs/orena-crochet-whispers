import { MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  image: string;
  name: string;
  whatsappMessage: string;
}

const ProductCard = ({ image, name, whatsappMessage }: ProductCardProps) => {
  const whatsappLink = `https://wa.me/254743173310?text=${encodeURIComponent(whatsappMessage)}`;
  
  const handleEnquire = () => {
    toast({
      title: "Opening WhatsApp...",
      description: `Let's discuss ${name}!`,
    });
  };
  
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-gold-hover transition-smooth hover:-translate-y-2">
      <div className="relative h-[450px] overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
      </div>
      
      <div className="p-6 text-center">
        <h3 className="text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-smooth">
          {name}
        </h3>
        
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleEnquire}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground rounded-full font-semibold transition-smooth hover:scale-105 hover:shadow-gold-hover active:scale-95"
        >
          <MessageCircle className="w-5 h-5 text-[hsl(var(--whatsapp-green))] group-hover:animate-pulse" />
          Enquire
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
