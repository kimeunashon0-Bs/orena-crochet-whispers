import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "254743173310";
  const defaultMessage = "Hi Miss_Mwangangi,,,, I'd like to know more about your crochet products!";
  
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
          
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-[hsl(var(--whatsapp-green))] p-2 rounded-full">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Chat with us!</h3>
              <p className="text-sm text-muted-foreground">We typically reply within minutes</p>
            </div>
          </div>
          
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-[hsl(var(--whatsapp-green))] text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-smooth"
          >
            Start Conversation
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingWhatsApp;
