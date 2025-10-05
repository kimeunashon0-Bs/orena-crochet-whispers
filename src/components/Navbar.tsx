import { useState } from "react";
import { Menu, X, Instagram, Twitter, Facebook } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-bold font-serif"
          >
            <span className="text-primary text-3xl drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]">O</span>rena
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('products')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Collection
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <div className="flex items-center gap-4 ml-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="md:hidden">
            <CollapsibleTrigger asChild>
              <button 
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg">
                <div className="flex flex-col p-4 gap-4">
                  <button 
                    onClick={() => scrollToSection('products')}
                    className="text-left text-foreground hover:text-primary transition-colors py-2"
                  >
                    Collection
                  </button>
                  <button 
                    onClick={() => scrollToSection('testimonials')}
                    className="text-left text-foreground hover:text-primary transition-colors py-2"
                  >
                    Testimonials
                  </button>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-left text-foreground hover:text-primary transition-colors py-2"
                  >
                    About
                  </button>
                  <div className="flex items-center gap-6 pt-4 border-t border-border">
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-6 h-6" />
                    </a>
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
