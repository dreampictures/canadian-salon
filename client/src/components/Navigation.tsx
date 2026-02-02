import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Our Work" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/verify", label: "Verify Certificate" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md z-50 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/logo-full.png" alt="Canadian Luxurious Salon" className="h-12 w-auto" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-secondary",
                location === link.href ? "text-secondary font-semibold" : "text-primary/80"
              )}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
             <div className="flex items-center gap-4 border-l border-primary/20 pl-4">
                <Link href="/admin" className="text-sm font-semibold text-primary hover:text-secondary">Dashboard</Link>
                <button 
                  onClick={() => logout()}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                >
                  Logout
                </button>
             </div>
          ) : (
             <Link href="/login" className="hidden md:block text-xs font-medium text-primary/50 hover:text-primary ml-4">
               Admin
             </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-primary" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border p-6 flex flex-col space-y-4 shadow-lg animate-in slide-in-from-top-5">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-lg font-serif",
                location === link.href ? "text-secondary" : "text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link 
              href="/admin" 
              onClick={() => setIsOpen(false)}
              className="text-lg font-serif text-primary border-t border-border pt-4"
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
