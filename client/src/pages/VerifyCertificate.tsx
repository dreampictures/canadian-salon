import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useVerifyCertificate } from "@/hooks/use-certificates";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle, XCircle, Award } from "lucide-react";

export default function VerifyCertificate() {
  const [location] = useLocation();
  const [certInput, setCertInput] = useState("");
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  // Extract 'certificate' query param manually since wouter's useSearch is basic
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const certParam = params.get("certificate");
    if (certParam) {
      setCertInput(certParam);
      setSearchQuery(certParam);
    }
  }, []);

  const { data: certificate, error, isLoading } = useVerifyCertificate(searchQuery);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (certInput.trim()) {
      setSearchQuery(certInput.trim());
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <div className="pt-32 pb-24 px-6 flex-1 flex flex-col items-center">
        <div className="text-center space-y-4 mb-12">
          <Award className="w-16 h-16 text-secondary mx-auto" />
          <h1 className="font-serif text-4xl font-bold text-primary">Verify Certificate</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Enter the certificate number below to verify the authenticity of a student's certification.
          </p>
        </div>

        <form onSubmit={handleVerify} className="w-full max-w-md flex gap-4 mb-12">
          <Input 
            value={certInput}
            onChange={(e) => setCertInput(e.target.value)}
            placeholder="Enter Certificate Number (e.g. LUX-2024-001)"
            className="h-12 bg-white text-lg"
          />
          <Button type="submit" size="lg" className="h-12 px-8 bg-secondary hover:bg-secondary/90 text-primary font-bold">
            <Search className="w-5 h-5" />
          </Button>
        </form>

        {/* Results Area */}
        <div className="w-full max-w-2xl min-h-[300px]">
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full mx-auto mb-4"/>
              <p className="text-muted-foreground">Verifying...</p>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-8 text-center animate-in fade-in slide-in-from-bottom-4">
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-destructive mb-2">Invalid Certificate</h3>
              <p className="text-destructive/80">
                The certificate number "{searchQuery}" could not be found in our records.
              </p>
            </div>
          )}

          {certificate && (
            <div className="bg-white border-2 border-secondary/30 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -ml-32 -mb-32" />

              <div className="relative z-10 text-center space-y-8">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide">
                  <CheckCircle className="w-4 h-4" /> Verified Authentic
                </div>

                <div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">
                    {certificate.studentName}
                  </h2>
                  <p className="text-muted-foreground uppercase tracking-widest text-sm">Student Name</p>
                </div>

                <div className="h-px w-full bg-border/50" />

                <div className="grid grid-cols-2 gap-8 text-left">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Course</p>
                    <p className="font-serif text-xl font-bold text-primary">{certificate.courseName}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Certificate No</p>
                    <p className="font-mono text-lg font-medium text-primary">{certificate.certificateNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Grade</p>
                    <p className="font-bold text-lg text-primary">{certificate.grade}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Issued Date</p>
                    <p className="font-medium text-lg text-primary">{new Date(certificate.issueDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-border/50">
                  <p className="text-sm text-muted-foreground italic">
                    This certificate was officially issued by LuxeSalon Academy.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
