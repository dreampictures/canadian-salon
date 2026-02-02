import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { Check } from "lucide-react";

const services = [
  {
    category: "Hair Care",
    items: [
      { name: "Signature Haircut", price: "$50+" },
      { name: "Balayage & Coloring", price: "$120+" },
      { name: "Keratin Treatment", price: "$150+" },
      { name: "Hair Spa", price: "$45+" },
    ]
  },
  {
    category: "Skin & Beauty",
    items: [
      { name: "Classic Facial", price: "$60+" },
      { name: "Bridal Makeup", price: "$200+" },
      { name: "HydraFacial", price: "$90+" },
      { name: "Waxing (Full Body)", price: "$80+" },
    ]
  },
  {
    category: "Nails",
    items: [
      { name: "Gel Manicure", price: "$40+" },
      { name: "Classic Pedicure", price: "$35+" },
      { name: "Nail Art", price: "$15+" },
      { name: "Acrylic Extensions", price: "$55+" },
    ]
  }
];

const courses = [
  {
    title: "Professional Makeup Artist",
    duration: "3 Months",
    price: "$1200",
    features: ["Basic to Advanced Techniques", "Bridal Makeup", "Portfolio Building", "Certification"]
  },
  {
    title: "Hair Styling Masterclass",
    duration: "2 Months",
    price: "$950",
    features: ["Cutting Techniques", "Color Theory", "Chemical Treatments", "Certification"]
  },
  {
    title: "Complete Cosmetology",
    duration: "6 Months",
    price: "$2500",
    features: ["Hair, Skin & Nails", "Salon Management", "Client Handling", "Internship"]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="pt-32 pb-12 bg-primary text-white text-center">
        <h1 className="font-serif text-5xl font-bold mb-4">Our Services & Courses</h1>
        <p className="text-white/70 max-w-2xl mx-auto px-6">Explore our premium beauty treatments and professional certification programs.</p>
      </div>

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Services Grid */}
          <SectionHeader title="Salon Services" centered className="mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {services.map((category, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow">
                <h3 className="font-serif text-2xl font-bold text-primary mb-6 pb-4 border-b border-border">{category.category}</h3>
                <ul className="space-y-4">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex justify-between items-center text-muted-foreground">
                      <span>{item.name}</span>
                      <span className="font-semibold text-secondary">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Courses Grid */}
          <SectionHeader title="Professional Courses" subtitle="Start your career in the beauty industry with our certified programs." centered className="mb-16" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-secondary/10 transform translate-x-2 translate-y-2 rounded-2xl group-hover:translate-x-3 group-hover:translate-y-3 transition-transform" />
                <div className="relative bg-white border border-border rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-primary/5 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Course</span>
                    <span className="font-bold text-secondary text-xl">{course.price}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-2">{course.title}</h3>
                  <p className="text-muted-foreground mb-6 text-sm">{course.duration}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {course.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-foreground/80">
                        <Check className="w-4 h-4 text-secondary mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full py-3 border border-primary text-primary font-semibold rounded hover:bg-primary hover:text-white transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
