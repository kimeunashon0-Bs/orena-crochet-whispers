import { MessageCircle, Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#2c2c2c] text-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <h3 className="text-3xl md:text-4xl font-bold font-serif">
          <span className="text-primary text-4xl md:text-5xl">O</span>rena
        </h3>
        
        <p className="text-lg md:text-xl">Handmade Crochet Creations</p>
        <p className="text-sm italic text-gray-300">
          "Crafted with passion, worn with pride"
        </p>
        
        <a 
          href="https://wa.me/254743173310"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth text-lg md:text-xl font-semibold"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp: +254 743 173310
        </a>
        
        <div className="flex items-center justify-center gap-6 pt-4">
          <a 
            href="https://www.instagram.com/miss__mwangangi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a 
            href="https://x.com/miss__mwangangi?t=2eIDt2nk9JqPTalyUtpXXg&s=08" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition-colors"
            aria-label="X (Twitter)"
          >
            <FaXTwitter className="w-6 h-6" />
          </a>
          <a 
            href="https://www.tiktok.com/@miss__mwangangi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition-colors"
            aria-label="TikTok"
          >
            <SiTiktok className="w-6 h-6" />
          </a>
        </div>
        
        <div className="pt-8 border-t border-white/20">
          <p className="text-sm text-white/60">
            © 2025 Orena. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
