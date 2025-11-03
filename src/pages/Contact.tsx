import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Instagram, Linkedin, ExternalLink, Sparkles, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7439115647",
      href: "tel:+917439115647",
      gradient: "from-primary to-primary-dark"
    },
    {
      icon: Mail,
      label: "Email",
      value: "snehasishxofficial@gmail.com",
      href: "mailto:snehasishxofficial@gmail.com",
      gradient: "from-accent to-accent-glow"
    },
    {
      icon: MapPin,
      label: "Address",
      value: "A26 Vidyasagar Park, Nabanagar, Birati, Kolkata 700051",
      href: "https://www.google.com/maps/search/?api=1&query=A26+Vidyasagar+Park+Nabanagar+Birati+Kolkata+700051",
      gradient: "from-primary to-accent"
    },
  ];

  const socialMedia = [
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      href: "https://wa.me/917439115647",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/_snehasish.das_",
      color: "from-pink-500 to-purple-600",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/snehasishxofficial/",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:snehasishxofficial@gmail.com",
      color: "from-red-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-gradient" />
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>
      
      <div className="pt-32 pb-16 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16 space-y-6 animate-in fade-in slide-in-from-top duration-700">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-effect border-primary/30">
              <MessageCircle className="h-4 w-4 text-primary-glow" />
              <span className="text-sm font-semibold text-primary">Let's Connect</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-gradient">
                Get In Touch
              </span>
            </h1>
            
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have questions? Feel free to reach out through any of these channels. I'm here to help!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Information */}
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <Card className="glass-effect border-primary/30 hover:shadow-elegant transition-all duration-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                      <Sparkles className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-black">Contact Info</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block p-6 rounded-2xl glass-effect border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
                    >
                      <div className="flex items-start gap-5">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-glow`}>
                          <info.icon className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-2 group-hover:text-primary-glow transition-colors">{info.label}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed break-words">{info.value}</p>
                        </div>
                        <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="glass-effect border-primary/30 hover:shadow-elegant transition-all duration-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center shadow-glow-accent">
                      <Instagram className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-black">Social Media</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {socialMedia.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden"
                      >
                        <div className="flex flex-col items-center gap-4 p-6 rounded-2xl glass-effect border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-elegant">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                            <social.icon className="h-8 w-8 text-white" />
                          </div>
                          <span className="text-base font-bold group-hover:text-primary-glow transition-colors">{social.name}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Google Form */}
              <Card className="glass-effect border-accent/30 hover:shadow-elegant transition-all duration-500">
                <CardContent className="pt-6">
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center shadow-glow-accent">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black">Query Form</h3>
                        <p className="text-sm text-muted-foreground">Submit your questions</p>
                      </div>
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Have specific questions? Fill out our detailed query form and I'll get back to you soon!
                    </p>
                    <a 
                      href="https://forms.gle/zB8fGjzLAQotoPkx6" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="gradient" className="w-full h-12 text-base font-bold group">
                        Open Query Form
                        <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Google Map & Office Hours */}
            <div className="space-y-8 animate-in fade-in slide-in-from-right duration-700 delay-200">
              <Card className="glass-effect border-primary/30 overflow-hidden hover:shadow-elegant transition-all duration-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                      <MapPin className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-black">Location</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-square w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.5!2d88.4167!3d22.6667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQwJzAwLjAiTiA4OMKwMjUnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Location Map"
                      className="grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-accent/30 hover:shadow-elegant transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="pt-8 relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center shadow-glow-accent">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-black">Office Hours</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { days: "Monday - Friday", time: "4:00 PM - 8:00 PM" },
                      { days: "Saturday - Sunday", time: "10:00 AM - 6:00 PM" }
                    ].map((schedule, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-xl glass-effect border-border/50 group-hover:border-accent/30 transition-all">
                        <span className="text-base text-muted-foreground font-semibold">{schedule.days}</span>
                        <span className="text-lg font-black bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">{schedule.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
