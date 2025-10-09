import { MessageCircle, Heart, ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  whatsappMessage: string;
}

const ProductCard = ({ id, image, name, whatsappMessage }: ProductCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const whatsappLink = `https://wa.me/254743173310?text=${encodeURIComponent(whatsappMessage)}`;
  
  const handleEnquire = () => {
    toast({
      title: "Opening WhatsApp...",
      description: `Let's discuss ${name}!`,
    });
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase
        .from("cart_items")
        .insert({
          user_id: user.id,
          product_id: id,
          quantity: 1,
        });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already in cart",
            description: "This item is already in your cart",
          });
        } else {
          throw error;
        }
      } else {
        setIsInCart(true);
        toast({
          title: "Added to cart!",
          description: `${name} added to your cart`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to add to cart",
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", id);

        if (error) throw error;
        setIsFavorite(false);
        toast({
          title: "Removed from favorites",
          description: `${name} removed from favorites`,
        });
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({
            user_id: user.id,
            product_id: id,
          });

        if (error) throw error;
        setIsFavorite(true);
        toast({
          title: "Added to favorites!",
          description: `${name} added to favorites`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-gold-hover transition-smooth hover:-translate-y-2 flex flex-col h-full">
      <div className="relative h-[450px] overflow-hidden flex-shrink-0">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
      </div>
      
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={handleToggleFavorite}
          className={`p-3 rounded-full backdrop-blur-sm transition-all ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-white/80 text-gray-700 hover:bg-white"
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-6 text-center flex-grow flex flex-col justify-between">
        <h3 className="text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-smooth min-h-[4rem] flex items-center justify-center">
          {name}
        </h3>
        
        <div className="space-y-2">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            variant="outline"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleEnquire}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground rounded-full font-semibold transition-smooth hover:scale-105 hover:shadow-gold-hover active:scale-95 w-full"
          >
            <MessageCircle className="w-5 h-5 text-[hsl(var(--whatsapp-green))] group-hover:animate-pulse" />
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
