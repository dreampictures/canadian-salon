import { Link } from "wouter";
import { ArrowRight, Star, Scissors, GraduationCap, Sparkles } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/40 z-10 mix-blend-multiply" />
          {/* Unsplash: Luxury Salon Interior */}
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Salon Interior" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
          >
            Beauty is Our <span className="text-secondary italic">Duty</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Experience premium care and professional styling at Canadian Luxurious Salon. 
            We define elegance through our expert services and training.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-secondary text-primary font-bold tracking-wide uppercase text-sm hover:bg-white transition-colors duration-300 rounded shadow-lg"
            >
              Book Appointment
            </Link>
            <Link 
              href="/services" 
              className="px-8 py-4 bg-transparent border border-white text-white font-bold tracking-wide uppercase text-sm hover:bg-white hover:text-primary transition-colors duration-300 rounded"
            >
              View Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Scissors className="w-10 h-10 text-secondary" />,
                title: "Expert Styling",
                description: "Our master stylists bring years of experience to craft your perfect look."
              },
              {
                icon: <GraduationCap className="w-10 h-10 text-secondary" />,
                title: "Professional Courses",
                description: "Learn from the best. Join our certified beauty courses and start your career."
              },
              {
                icon: <Sparkles className="w-10 h-10 text-secondary" />,
                title: "Premium Products",
                description: "We use only the finest organic and premium beauty products for your skin."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-border/50 rounded-2xl bg-background hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="mb-6 p-4 bg-secondary/10 w-fit rounded-full group-hover:bg-secondary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold font-serif mb-3 text-primary">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="Our Signature Services" 
            subtitle="Indulge in our wide range of premium beauty treatments designed to make you shine."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                "Hair Cutting & Styling",
                "Bridal Makeup",
                "Skin Treatments & Facials",
                "Manicure & Pedicure",
                "Hair Coloring & Highlights"
              ].map((service, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border-b border-border hover:border-secondary transition-colors group cursor-pointer">
                  <span className="font-serif text-xl text-primary group-hover:text-secondary transition-colors">{service}</span>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary transform group-hover:translate-x-1 transition-all" />
                </div>
              ))}
              <div className="pt-8">
                <Link href="/services" className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors group">
                  View Full Menu <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
               {/* Unsplash: Woman getting hair styled */}
               <img 
                 src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1000" 
                 alt="Salon Service" 
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
               />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready for a Transformation?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Whether you want a new look or want to learn the art of beauty, we are here for you.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-secondary text-primary font-bold rounded hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg">
              Book Now
            </Link>
            <Link href="/verify" className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded hover:bg-white/10 transition-all">
              Verify Certificate
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
