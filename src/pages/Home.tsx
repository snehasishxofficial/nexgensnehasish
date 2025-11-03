import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Instagram, Linkedin, GraduationCap, Users, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import profilePhoto from "@/assets/profile-photo.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Enhanced Design */}
      <section className="relative pt-32 pb-40 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-effect border-primary/30">
                <Sparkles className="h-4 w-4 text-primary-glow" />
                <span className="text-sm font-semibold bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent">
                  Premium Education Platform
                </span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-gradient">
                  Transform Your
                </span>
                <br />
                <span className="text-foreground">Future Today</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                Expert tutoring in <span className="text-primary-glow font-bold">Math, Science & CS</span> for Classes 8-12. 
                Join 100+ students achieving excellence with personalized guidance.
              </p>

              <div className="flex flex-wrap gap-5 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
                <Link to="/tutoring">
                  <Button size="lg" variant="gradient" className="group">
                    Explore Services
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline">
                    Get In Touch
                  </Button>
                </Link>
              </div>

              {/* Social Media Links */}
              <div className="flex gap-4 pt-6">
                {[
                  { icon: Mail, href: "mailto:snehasishxofficial@gmail.com", label: "Email" },
                  { icon: FaWhatsapp, href: "https://wa.me/917439115647", label: "WhatsApp" },
                  { icon: Instagram, href: "https://www.instagram.com/_snehasish.das_", label: "Instagram" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/snehasishxofficial/", label: "LinkedIn" }
                ].map(({ icon: Icon, href, label }) => (
                  <a 
                    key={label}
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl glass-effect border-border/50 hover:border-primary hover:bg-primary/10 transition-all hover:shadow-glow hover:scale-110 group"
                    aria-label={label}
                  >
                    <Icon className="h-6 w-6 text-primary group-hover:text-primary-glow transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Content - Profile Photo with Enhanced Design */}
            <div className="relative animate-in fade-in slide-in-from-right duration-1000 delay-200">
              <div className="relative">
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-[80px] opacity-40 animate-pulse" />
                
                {/* Main Image Container */}
                <div className="relative rounded-3xl overflow-hidden border-4 border-primary/30 shadow-[0_0_80px_rgba(59,130,246,0.4)] hover:shadow-[0_0_120px_rgba(59,130,246,0.6)] transition-all duration-500 hover:scale-[1.02] group">
                  <img 
                    src={profilePhoto} 
                    alt="Snehasish Das - NexGen Tutor" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                    <h3 className="text-2xl font-bold text-foreground mb-1">Snehasish Das</h3>
                    <p className="text-primary-glow font-medium">B.Tech CSE (Cyber Security)</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                <div className="glass-effect border-primary/30 rounded-2xl p-6 shadow-elegant">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div className="group hover:scale-110 transition-transform cursor-pointer">
                      <div className="text-3xl font-black bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">3+</div>
                      <div className="text-xs text-muted-foreground font-medium mt-1">Years</div>
                    </div>
                    <div className="group hover:scale-110 transition-transform cursor-pointer">
                      <div className="text-3xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">100+</div>
                      <div className="text-xs text-muted-foreground font-medium mt-1">Students</div>
                    </div>
                    <div className="group hover:scale-110 transition-transform cursor-pointer">
                      <div className="text-3xl font-black bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">5+</div>
                      <div className="text-xs text-muted-foreground font-medium mt-1">Subjects</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Premium Cards */}
      <section className="py-32 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-black">
              Why Choose <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">NexGen</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience excellence in education with personalized attention and proven results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: GraduationCap,
                title: "3+ Years Experience",
                description: "Proven track record of helping students excel in their academics with consistent results",
                gradient: "from-primary/20 to-primary-glow/20"
              },
              {
                icon: Users,
                title: "CBSE, ICSE & ISC",
                description: "Specialized coaching for all major educational boards with tailored teaching methods",
                gradient: "from-accent/20 to-accent-glow/20"
              },
              {
                icon: TrendingUp,
                title: "Tech & Science",
                description: "From Python programming to advanced Physics and Chemistry - comprehensive coverage",
                gradient: "from-primary/20 to-accent/20"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative p-8 rounded-2xl glass-effect border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-elegant hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-glow">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-glow transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Premium Design */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-5xl md:text-6xl font-black max-w-3xl mx-auto leading-tight">
            Ready to Start Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Success Journey</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join my tuition classes and unlock your full potential. Register today and experience the difference!
          </p>
          <Link to="/auth">
            <Button size="lg" variant="gradient" className="text-lg group">
              Register Now
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
