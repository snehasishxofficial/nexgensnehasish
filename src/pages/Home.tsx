import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import profilePhoto from "@/assets/profile-photo.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-sm font-medium text-primary-glow">NexGen Education</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                  Welcome to
                </span>
                <br />
                <span className="text-foreground">NexGen</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Expert tutoring in <span className="text-primary-glow font-semibold">Mathematics, Science, and Computer Science</span> for Classes 8-12. Empowering students to achieve excellence.
              </p>

              <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
                <Link to="/tutoring">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover:scale-105 shadow-glow">
                    Explore My Services
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-all">
                    Get In Touch
                  </Button>
                </Link>
              </div>

              {/* Social Media Links */}
              <div className="flex gap-4 pt-4">
                <a 
                  href="mailto:snehasishxofficial@gmail.com" 
                  className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all hover:shadow-glow hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="h-6 w-6 text-primary" />
                </a>
                <a 
                  href="https://wa.me/917439115647" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all hover:shadow-glow hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="h-6 w-6 text-primary" />
                </a>
                <a 
                  href="https://www.instagram.com/_snehasish.das_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all hover:shadow-glow hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6 text-primary" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/snehasishxofficial/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all hover:shadow-glow hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-primary" />
                </a>
              </div>
            </div>

            {/* Right Content - Profile Photo */}
            <div className="relative animate-in fade-in slide-in-from-right duration-1000 delay-200">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-3xl opacity-30 animate-pulse" />
                <div className="relative rounded-2xl overflow-hidden border-4 border-primary/30 shadow-[0_0_50px_rgba(147,51,234,0.3)] hover:shadow-[0_0_80px_rgba(147,51,234,0.5)] transition-all duration-500 hover:scale-105">
                  <img 
                    src={profilePhoto} 
                    alt="Snehasish Das - NexGen Tutor" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                <div className="bg-card/90 backdrop-blur-lg rounded-xl border border-border/50 p-4 shadow-card">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">3+</div>
                      <div className="text-xs text-muted-foreground">Years</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">100+</div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">5+</div>
                      <div className="text-xs text-muted-foreground">Subjects</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose My Tuition?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-all hover:shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">3+ Years Experience</h3>
              <p className="text-muted-foreground">
                Proven track record of helping students excel in their academics
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-all hover:shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">CBSE, ICSE & ISC</h3>
              <p className="text-muted-foreground">
                Specialized coaching for all major educational boards
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-all hover:shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Tech & Science</h3>
              <p className="text-muted-foreground">
                From Python programming to advanced Physics and Chemistry
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Learning?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join my tuition classes and unlock your full potential. Register today!
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
              Register Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
