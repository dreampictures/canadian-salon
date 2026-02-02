import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useVerifyCertificate } from "@/hooks/use-certificates";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle, XCircle, User } from "lucide-react";

export default function VerifyCertificate() {
  const [certInput, setCertInput] = useState("");
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

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
        {/* Search Section with Water Drop Gradient */}
        {!certificate && !isLoading && (
          <>
            <div className="text-center space-y-4 mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">Official Verification</h1>
              <p className="text-foreground max-w-lg mx-auto">
                Enter the certificate number below to verify the authenticity of a student's certification.
              </p>
            </div>

            <form onSubmit={handleVerify} className="w-full max-w-lg" data-testid="form-verify">
              <div className="water-drop-gradient rounded-2xl p-8 shadow-lg">
                <label className="block text-foreground font-semibold mb-3 relative z-10">
                  Enter Certificate Number
                </label>
                <div className="flex gap-4 relative z-10">
                  <Input 
                    value={certInput}
                    onChange={(e) => setCertInput(e.target.value)}
                    placeholder="e.g., LUX-2025-001"
                    className="h-14 water-drop-input rounded-xl text-lg"
                    data-testid="input-certificate-number"
                  />
                  <button 
                    type="submit" 
                    className="h-14 px-8 glass-button-primary rounded-xl font-bold flex items-center gap-2"
                    data-testid="button-verify"
                  >
                    <Search className="w-5 h-5" />
                    <span className="hidden sm:inline">Verify</span>
                  </button>
                </div>
              </div>
            </form>
          </>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"/>
            <p className="text-foreground">Verifying...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">Official Verification</h1>
              <p className="text-destructive font-semibold">Certificate Not Found</p>
            </div>
            <div className="glass-card bg-destructive/10 border border-destructive/20 rounded-xl p-8 text-center animate-in fade-in slide-in-from-bottom-4">
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-destructive mb-2">Invalid Certificate</h3>
              <p className="text-destructive/90 mb-6 font-medium">
                The certificate number "{searchQuery}" could not be found in our records.
              </p>
              <button 
                onClick={() => { setSearchQuery(null); setCertInput(""); }}
                className="glass-button px-6 py-3 rounded-xl text-primary font-bold"
                data-testid="button-try-again"
              >
                Try Another Number
              </button>
            </div>
          </div>
        )}

        {/* Success - Certificate Found */}
        {certificate && (
          <div className="w-full max-w-4xl animate-in zoom-in-95 duration-500">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">Official Verification</h1>
              <div className="flex items-center justify-center gap-2 text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="font-semibold">Authentic Digital Record Found</span>
              </div>
            </div>

            {/* Certificate Card with Drop Shadow */}
            <div 
              className="bg-white rounded-2xl overflow-hidden border border-border/20 shadow-2xl"
              style={{ 
                boxShadow: '0 25px 50px -12px rgba(92, 61, 46, 0.25), 0 12px 24px -8px rgba(92, 61, 46, 0.15), 0 4px 8px -2px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left Side - Photo Section */}
                <div className="md:w-1/3 bg-gradient-to-br from-primary/15 via-primary/10 to-secondary/10 p-8 flex flex-col items-center justify-center relative">
                  {/* Decorative border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary"></div>
                  
                  {/* Photo with enhanced shadow */}
                  <div 
                    className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-white border-4 border-white overflow-hidden flex items-center justify-center mb-6 relative"
                    style={{ boxShadow: '0 10px 40px -10px rgba(92, 61, 46, 0.4), 0 4px 12px rgba(0,0,0,0.1)' }}
                  >
                    {certificate.studentPhoto ? (
                      <img 
                        src={certificate.studentPhoto} 
                        alt={certificate.studentName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-20 h-20 text-muted-foreground/50" />
                    )}
                  </div>
                  
                  {/* Verified Badge with shadow */}
                  <div 
                    className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-full font-bold text-sm mb-3"
                    style={{ boxShadow: '0 4px 14px rgba(34, 197, 94, 0.4)' }}
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Verified Valid</span>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary/70 font-semibold">Official Record</p>
                </div>

                {/* Right Side - Details */}
                <div className="md:w-2/3 p-8 md:p-12 bg-gradient-to-br from-white to-background/30">
                  {/* Salon Header with decorative line */}
                  <div className="mb-8 pb-6 border-b border-secondary/30">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary tracking-wide uppercase mb-1">
                      Canadian Luxurious Salon
                    </h2>
                    <p className="text-secondary font-bold tracking-[0.3em] text-xs uppercase">Beauty is Our Duty</p>
                  </div>

                  {/* Student Name - Prominent */}
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 font-semibold">Student Name</p>
                    <p className="font-serif text-3xl font-bold text-primary">{certificate.studentName}</p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                    <div className="p-4 rounded-xl bg-primary/5">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">Course Name</p>
                      <p className="text-primary font-bold text-lg">{certificate.courseName}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/10">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">Certificate Number</p>
                      <span 
                        className="inline-block bg-secondary text-primary font-mono font-bold px-4 py-1.5 rounded-lg text-sm"
                        style={{ boxShadow: '0 2px 8px rgba(201, 163, 86, 0.3)' }}
                      >
                        {certificate.certificateNumber}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-background">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">Course Duration</p>
                      <p className="text-foreground font-bold text-lg">{certificate.courseDuration}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">Issue Date</p>
                      <p className="text-foreground font-bold text-lg">{certificate.issueDate}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">Attendance</p>
                      <p className="text-foreground font-bold text-lg">{certificate.attendancePercentage}%</p>
                    </div>
                    <div className="p-4 rounded-xl bg-primary/5">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">Final Grade</p>
                      <span 
                        className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white font-bold rounded-xl text-xl"
                        style={{ boxShadow: '0 4px 14px rgba(92, 61, 46, 0.4)' }}
                      >
                        {certificate.grade}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3 border-t border-border/20">
                <p className="text-sm text-foreground/70 font-medium">
                  &copy; Canadian Luxurious Salon Official Records
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-sm font-bold">
                    Verification Status: <span className="text-green-600 uppercase">Valid</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Verify Another */}
            <div className="text-center mt-8">
              <button 
                onClick={() => { setSearchQuery(null); setCertInput(""); }}
                className="glass-button px-6 py-3 rounded-xl text-primary font-bold"
                data-testid="button-verify-another"
              >
                Verify Another Certificate
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
