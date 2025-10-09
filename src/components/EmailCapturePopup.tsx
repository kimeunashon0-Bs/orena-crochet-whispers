import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Mail, Sparkles } from "lucide-react";

const EmailCapturePopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds if not shown before and user is not logged in
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("emailCaptureShown");
      const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!hasSeenPopup && !session) {
          setOpen(true);
        }
      };
      checkAuth();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("email_captures")
        .insert({ email });

      if (error) throw error;

      localStorage.setItem("emailCaptureShown", "true");
      toast({
        title: "Welcome! 🎉",
        description: "You're now eligible for 5% off when you create an account!",
      });
      setOpen(false);
    } catch (error: any) {
      if (error.code === "23505") {
        toast({
          title: "Already registered!",
          description: "This email is already in our system.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save email. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    localStorage.setItem("emailCaptureShown", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-primary" />
            Welcome to Orena!
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Join our community and get <span className="font-bold text-primary">5% OFF</span> when you create an account!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 bg-muted p-4 rounded-lg">
            <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Saving..." : "Get My Discount"}
            </Button>
            <Button type="button" variant="outline" onClick={handleClose}>
              Maybe Later
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCapturePopup;
