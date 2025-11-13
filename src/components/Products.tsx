import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";

// Import images
import blueBikini from "@/assets/blue-bikini.jpg";
import redPearlDress from "@/assets/red-pearl-dress.jpg";
import orangeBikini from "@/assets/orange-bikini.jpg";
import multicolorDress from "@/assets/multicolor-dress.jpg";
import purpleTop from "@/assets/purple-top.jpg";
import greyBeanie from "@/assets/grey-beanie.jpg";

const imageMap: Record<string, string> = {
  "blue-bikini.jpg": blueBikini,
  "red-pearl-dress.jpg": redPearlDress,
  "orange-bikini.jpg": orangeBikini,
  "multicolor-dress.jpg": multicolorDress,
  "purple-top.jpg": purpleTop,
  "grey-beanie.jpg": greyBeanie,
};

interface Product {
  id: string;
  name: string;
  image_url: string;
  whatsapp_message: string;
}

const Products = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 lg:px-16" id="products">
        <div className="max-w-7xl mx-auto text-center">
          <p>Loading products...</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16" id="products">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
          <span className="text-primary text-5xl md:text-6xl">O</span>ur Collection
        </h2>
        
        <div 
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-stretch transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in flex"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard
                id={product.id}
                image={imageMap[product.image_url] || product.image_url}
                name={product.name}
                whatsappMessage={product.whatsapp_message}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
