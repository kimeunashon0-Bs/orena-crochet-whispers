import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "254743173310";
  const defaultMessage = "Hi! 👋 I'm interested in your beautiful handcrafted crochet pieces!";
  
  const handleWhatsAppClick = () => {
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[hsl(var(--whatsapp-green))] text-white p-4 rounded-full shadow-lg hover:shadow-gold-hover transition-smooth hover:scale-110 animate-fade-in"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Popup Tooltip */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-card border border-border rounded-lg shadow-gold p-4 w-72 animate-scale-in">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-[hsl(var(--whatsapp-green))] p-2 rounded-full flex-shrink-0 animate-pulse">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg mb-1">💬 Let's Create Together!</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Have a custom design in mind? Want to know more about our pieces?
              </p>
              <p className="text-xs text-primary font-semibold">
                ⚡ We respond within minutes!
              </p>
            </div>
          </div>
          
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-gradient-to-br from-[hsl(var(--whatsapp-green))] to-[hsl(var(--whatsapp-green))] text-white py-3 px-4 rounded-lg font-bold hover:scale-105 transition-smooth shadow-lg hover:shadow-gold-hover flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Chat Now on WhatsApp
          </button>
          
          <p className="text-xs text-center text-muted-foreground mt-2">
            Join 100+ happy customers! ⭐
          </p>
        </div>
      )}
    </>
  );
};

export default FloatingWhatsApp;
