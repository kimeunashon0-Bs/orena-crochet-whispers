import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Heart, ShoppingCart, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Favorite {
  id: string;
  products: {
    id: string;
    name: string;
    image_url: string;
    whatsapp_message: string;
  };
}

const Favorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchFavorites();
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select(`
          id,
          products (
            id,
            name,
            image_url,
            whatsapp_message
          )
        `)
        .eq("user_id", user?.id);

      if (error) throw error;
      setFavorites(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load favorites",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (favoriteId: string) => {
    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("id", favoriteId);

      if (error) throw error;

      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
      toast({
        title: "Removed from favorites",
        description: "Item removed from your favorites",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to remove favorite",
        variant: "destructive",
      });
    }
  };

  const addToCart = async (productId: string) => {
    try {
      const { error } = await supabase
        .from("cart_items")
        .insert({
          user_id: user?.id,
          product_id: productId,
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
        toast({
          title: "Added to cart",
          description: "Item added to your cart",
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Button>

          <h1 className="text-4xl font-bold mb-8">
            <Heart className="inline w-8 h-8 mr-2 text-red-500" />
            My Favorites
          </h1>

          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground mb-4">No favorites yet</p>
              <Button onClick={() => navigate("/")}>Browse Products</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="relative h-64">
                    <img
                      src={`/src/assets/${favorite.products.image_url}`}
                      alt={favorite.products.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-lg">{favorite.products.name}</h3>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => addToCart(favorite.products.id)}
                        variant="outline"
                        className="flex-1"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => removeFavorite(favorite.id)}
                        variant="destructive"
                        size="icon"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </Button>
                    </div>
                    <a
                      href={`https://wa.me/254743173310?text=${encodeURIComponent(favorite.products.whatsapp_message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="default" className="w-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Enquire
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
