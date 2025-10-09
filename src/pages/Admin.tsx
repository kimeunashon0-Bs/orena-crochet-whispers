import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Trash2, Edit, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";

interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string;
  category: string | null;
  whatsapp_message: string;
  is_active: boolean;
  sort_order: number;
}

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    whatsapp_message: "",
    is_active: true,
    sort_order: 0,
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchProducts();
    }
  }, [user, isAdmin]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order");

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    return filePath;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let image_url = editingProduct?.image_url || "";

      if (imageFile) {
        image_url = await handleImageUpload(imageFile);
      }

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update({ ...formData, image_url })
          .eq("id", editingProduct.id);

        if (error) throw error;
        toast({ title: "Product updated successfully" });
      } else {
        const { error } = await supabase
          .from("products")
          .insert({ ...formData, image_url });

        if (error) throw error;
        toast({ title: "Product added successfully" });
      }

      fetchProducts();
      resetForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast({ title: "Product deleted successfully" });
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      whatsapp_message: "",
      is_active: true,
      sort_order: 0,
    });
    setEditingProduct(null);
    setImageFile(null);
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      category: product.category || "",
      whatsapp_message: product.whatsapp_message,
      is_active: product.is_active,
      sort_order: product.sort_order,
    });
  };

  if (authLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Store
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp_message">WhatsApp Message</Label>
                    <Textarea
                      id="whatsapp_message"
                      value={formData.whatsapp_message}
                      onChange={(e) => setFormData({ ...formData, whatsapp_message: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Product Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      required={!editingProduct}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" disabled={loading}>
                      {loading ? "Saving..." : editingProduct ? "Update" : "Add"}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <h1 className="text-4xl font-bold mb-8">Product Management</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-card rounded-lg overflow-hidden shadow-lg">
                <img
                  src={`/src/assets/${product.image_url}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <div className="flex gap-2">
                    <Button onClick={() => startEdit(product)} variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(product.id)} variant="destructive" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
