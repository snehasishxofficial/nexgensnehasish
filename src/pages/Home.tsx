import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-b from-background via-accent/10 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Welcome to Snehasish Das Tuition Classes
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150">
              Expert tutoring in Mathematics, Science, and Computer Science for Classes 8-12
            </p>

            <div className="flex flex-wrap gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              <Link to="/tutoring">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                  Explore My Services
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Get In Touch
                </Button>
              </Link>
            </div>

            {/* Social Media Links */}
            <div className="flex gap-6 justify-center pt-8 animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-500">
              <a 
                href="mailto:snehasishxofficial@gmail.com" 
                className="p-3 rounded-full bg-card border border-border hover:border-primary transition-colors hover:shadow-glow"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a 
                href="https://wa.me/917439115647" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card border border-border hover:border-primary transition-colors hover:shadow-glow"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-6 w-6" />
              </a>
              <a 
                href="https://www.instagram.com/_snehasish.das_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card border border-border hover:border-primary transition-colors hover:shadow-glow"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/snehasishxofficial/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card border border-border hover:border-primary transition-colors hover:shadow-glow"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
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
