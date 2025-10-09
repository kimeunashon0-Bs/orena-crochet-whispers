import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X as CloseIcon, Instagram, ShoppingCart, Heart, User, LogOut } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

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
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 ml-4">
              <a 
                href="https://www.instagram.com/miss__mwangangi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/miss__mwangangi?t=2eIDt2nk9JqPTalyUtpXXg&s=08" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@miss__mwangangi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
                aria-label="TikTok"
              >
                <SiTiktok className="w-5 h-5" />
              </a>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4 ml-4">
              <button
                onClick={() => navigate("/cart")}
                className="text-foreground hover:text-primary transition-colors relative"
              >
                <ShoppingCart className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigate("/favorites")}
                className="text-foreground hover:text-primary transition-colors"
              >
                <Heart className="w-6 h-6" />
              </button>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="w-6 h-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => navigate("/admin")}>
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => navigate("/cart")}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Cart
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/favorites")}>
                      <Heart className="w-4 h-4 mr-2" />
                      Favorites
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => navigate("/auth")} variant="default">
                  Sign In
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="md:hidden">
            <CollapsibleTrigger asChild>
              <button 
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                  
                  {/* Mobile User Actions */}
                  <div className="flex flex-col gap-2 pt-4 border-t border-border">
                    <Button onClick={() => navigate("/cart")} variant="outline" className="w-full justify-start">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Cart
                    </Button>
                    <Button onClick={() => navigate("/favorites")} variant="outline" className="w-full justify-start">
                      <Heart className="w-4 h-4 mr-2" />
                      Favorites
                    </Button>
                    {user ? (
                      <>
                        {isAdmin && (
                          <Button onClick={() => navigate("/admin")} variant="outline" className="w-full justify-start">
                            Admin Dashboard
                          </Button>
                        )}
                        <Button onClick={signOut} variant="outline" className="w-full justify-start">
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => navigate("/auth")} className="w-full">
                        Sign In
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-6 pt-4 border-t border-border">
                    <a 
                      href="https://www.instagram.com/miss__mwangangi" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a 
                      href="https://x.com/miss__mwangangi?t=2eIDt2nk9JqPTalyUtpXXg&s=08" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                      aria-label="X (Twitter)"
                    >
                      <FaXTwitter className="w-6 h-6" />
                    </a>
                    <a 
                      href="https://www.tiktok.com/@miss__mwangangi" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                      aria-label="TikTok"
                    >
                      <SiTiktok className="w-6 h-6" />
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
