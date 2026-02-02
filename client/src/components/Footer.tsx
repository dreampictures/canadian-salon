import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="font-serif text-3xl font-bold text-secondary">LuxeSalon</h3>
          <p className="text-primary-foreground/70 leading-relaxed">
            Where beauty meets luxury. We provide premium salon services and professional certification courses for aspiring beauty experts.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-secondary hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-secondary hover:text-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-secondary hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="font-serif text-xl font-semibold text-secondary">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Our Work", href: "/gallery" },
              { label: "Verify Certificate", href: "/verify" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="font-serif text-xl font-semibold text-secondary">Contact Us</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-primary-foreground/70">
              <MapPin className="w-5 h-5 mt-0.5 text-secondary" />
              <span>123 Luxury Ave, Beverly Hills,<br />CA 90210</span>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/70">
              <Phone className="w-5 h-5 text-secondary" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/70">
              <Mail className="w-5 h-5 text-secondary" />
              <span>hello@luxesalon.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-sm text-primary-foreground/40">
        © {new Date().getFullYear()} LuxeSalon. All rights reserved.
      </div>
    </footer>
  );
}
