import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CartItem {
  id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    image_url: string;
    whatsapp_message: string;
  };
}

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchCartItems();
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          id,
          quantity,
          products (
            id,
            name,
            image_url,
            whatsapp_message
          )
        `)
        .eq("user_id", user?.id);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;

      setCartItems(cartItems.filter(item => item.id !== itemId));
      toast({
        title: "Item removed",
        description: "Item removed from cart",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = () => {
    const itemsList = cartItems
      .map(item => `- ${item.products.name} (Qty: ${item.quantity})`)
      .join("\n");
    
    const message = `Hi Miss_Mwangangi,\n\nI'd like to checkout these items from Orena:\n\n${itemsList}\n\nCould you please share the total price and availability?`;
    const whatsappLink = `https://wa.me/254743173310?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappLink, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>

          <h1 className="text-4xl font-bold mb-8">
            <ShoppingBag className="inline w-8 h-8 mr-2" />
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={() => navigate("/")}>Start Shopping</Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card rounded-lg p-4 flex items-center gap-4 shadow-md"
                  >
                    <img
                      src={`/src/assets/${item.products.image_url}`}
                      alt={item.products.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">{item.products.name}</h3>
                      <p className="text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="sticky bottom-4 bg-card rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-semibold">
                    Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </p>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Checkout via WhatsApp
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
