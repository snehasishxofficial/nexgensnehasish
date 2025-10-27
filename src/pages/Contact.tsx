import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Instagram, Linkedin, ExternalLink } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+91 7439115647",
      href: "tel:+917439115647",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "snehasishxofficial@gmail.com",
      href: "mailto:snehasishxofficial@gmail.com",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Address",
      value: "A26 Vidyasagar Park, Nabanagar, Birati, Kolkata 700051",
      href: "https://www.google.com/maps/search/?api=1&query=A26+Vidyasagar+Park+Nabanagar+Birati+Kolkata+700051",
    },
  ];

  const socialMedia = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="h-6 w-6" />,
      href: "https://wa.me/917439115647",
      color: "hover:text-green-500",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-6 w-6" />,
      href: "https://www.instagram.com/_snehasish.das_",
      color: "hover:text-pink-500",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-6 w-6" />,
      href: "https://www.linkedin.com/in/snehasishxofficial/",
      color: "hover:text-blue-500",
    },
    {
      name: "Email",
      icon: <Mail className="h-6 w-6" />,
      href: "mailto:snehasishxofficial@gmail.com",
      color: "hover:text-red-500",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions? Feel free to reach out through any of these channels
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{info.label}</h3>
                        <p className="text-sm text-muted-foreground">{info.value}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Connect on Social Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {socialMedia.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-3 p-6 rounded-lg bg-secondary/50 hover:bg-secondary transition-all group"
                      >
                        <div className={`transition-colors ${social.color}`}>
                          {social.icon}
                        </div>
                        <span className="text-sm font-medium">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Google Form */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Query Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Have specific questions? Fill out our detailed query form
                  </p>
                  <a 
                    href="https://forms.gle/zB8fGjzLAQotoPkx6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full">
                      Open Query Form
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Google Map */}
            <div className="space-y-6">
              <Card className="border-border overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location
                  </CardTitle>
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
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-gradient-to-br from-primary/10 to-accent/10">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday:</span>
                      <span className="font-medium">4:00 PM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday - Sunday:</span>
                      <span className="font-medium">10:00 AM - 6:00 PM</span>
                    </div>
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
