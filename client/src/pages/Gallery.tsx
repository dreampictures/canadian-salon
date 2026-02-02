import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useGallery } from "@/hooks/use-gallery";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Gallery() {
  const { data: items, isLoading } = useGallery();
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Hair", "Makeup", "Nails", "Academy"];

  const filteredItems = filter === "All" 
    ? items 
    : items?.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="pt-32 pb-12 bg-primary text-white text-center">
        <h1 className="font-serif text-5xl font-bold mb-4">Our Masterpieces</h1>
        <p className="text-white/70 max-w-2xl mx-auto px-6">A curated collection of our finest work and transformations.</p>
      </div>

      <main className="flex-1 py-12 px-6 max-w-7xl mx-auto w-full">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                filter === cat 
                  ? "bg-secondary text-primary shadow-lg scale-105" 
                  : "bg-white text-muted-foreground border border-border hover:border-secondary hover:text-secondary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Skeleton key={n} className="aspect-square rounded-xl" />
            ))}
          </div>
        ) : filteredItems?.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            No images found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems?.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-xl bg-white shadow-md cursor-pointer aspect-square">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-secondary text-xs font-bold uppercase tracking-wider mb-2">{item.category}</span>
                  <h3 className="text-white font-serif text-xl font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
