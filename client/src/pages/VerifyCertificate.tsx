import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useVerifyCertificate } from "@/hooks/use-certificates";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
        {/* Search Section */}
        {!certificate && !isLoading && (
          <>
            <div className="text-center space-y-4 mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">Official Verification</h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Enter the certificate number below to verify the authenticity of a student's certification.
              </p>
            </div>

            <form onSubmit={handleVerify} className="w-full max-w-md flex gap-4 mb-12" data-testid="form-verify">
              <Input 
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                placeholder="Enter Certificate Number"
                className="h-12 bg-white text-lg"
                data-testid="input-certificate-number"
              />
              <Button type="submit" size="lg" className="h-12 px-8 bg-secondary hover:bg-secondary/90 text-primary font-bold" data-testid="button-verify">
                <Search className="w-5 h-5" />
              </Button>
            </form>
          </>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full mx-auto mb-4"/>
            <p className="text-muted-foreground">Verifying...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">Official Verification</h1>
              <p className="text-destructive font-medium">Certificate Not Found</p>
            </div>
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-8 text-center animate-in fade-in slide-in-from-bottom-4">
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-destructive mb-2">Invalid Certificate</h3>
              <p className="text-destructive/80 mb-6">
                The certificate number "{searchQuery}" could not be found in our records.
              </p>
              <Button 
                onClick={() => { setSearchQuery(null); setCertInput(""); }}
                variant="outline"
                data-testid="button-try-again"
              >
                Try Another Number
              </Button>
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
                <span className="font-medium">Authentic Digital Record Found</span>
              </div>
            </div>

            {/* Certificate Card */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-border">
              <div className="flex flex-col md:flex-row">
                {/* Left Side - Photo Section */}
                <div className="md:w-1/3 bg-gradient-to-b from-gray-100 to-gray-50 p-8 flex flex-col items-center justify-center border-l-4 border-l-secondary">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 border-4 border-secondary/30 overflow-hidden flex items-center justify-center mb-4 relative">
                    {certificate.studentPhoto ? (
                      <img 
                        src={certificate.studentPhoto} 
                        alt={certificate.studentName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                    <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-secondary rounded-full flex items-center justify-center border-2 border-white">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified Valid</span>
                  </div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Official Record</p>
                </div>

                {/* Right Side - Details */}
                <div className="md:w-2/3 p-8 md:p-10">
                  {/* Salon Header */}
                  <div className="mb-8">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary tracking-wide uppercase">
                      Canadian Luxurious Salon
                    </h2>
                    <p className="text-secondary font-medium tracking-widest text-sm uppercase">Beauty is Our Duty</p>
                  </div>

                  {/* Student Name */}
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-medium">Student Name</p>
                    <p className="font-serif text-2xl font-bold text-primary">{certificate.studentName}</p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-medium">Course Name</p>
                      <p className="text-secondary font-semibold text-lg">{certificate.courseName}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-medium">Certificate Number</p>
                      <span className="inline-block bg-secondary/20 text-primary font-mono font-bold px-3 py-1 rounded border border-secondary/30">
                        {certificate.certificateNumber}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-medium">Course Duration</p>
                      <p className="text-primary font-medium">{certificate.courseDuration}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-medium">Issue Date</p>
                      <p className="text-primary font-medium">{certificate.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-medium">Attendance Percentage</p>
                      <p className="text-primary font-medium">{certificate.attendancePercentage}%</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-medium">Final Grade</p>
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-primary text-white font-bold rounded-md text-lg">
                        {certificate.grade}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  &copy; Canadian Luxurious Salon Official Records
                </p>
                <p className="text-xs font-medium">
                  Verification Status: <span className="text-green-600 font-bold uppercase">Valid</span>
                </p>
              </div>
            </div>

            {/* Verify Another */}
            <div className="text-center mt-8">
              <Button 
                onClick={() => { setSearchQuery(null); setCertInput(""); }}
                variant="outline"
                data-testid="button-verify-another"
              >
                Verify Another Certificate
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
