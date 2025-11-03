import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Star, Target } from "lucide-react";

const Tutoring = () => {
  const subjects = [
    { name: "Mathematics", icon: "🔢", boards: ["CBSE", "ICSE", "ISC"], color: "from-primary to-primary-dark" },
    { name: "Science", icon: "🔬", boards: ["CBSE", "ICSE"], color: "from-accent to-accent-glow" },
    { name: "Physics", icon: "⚡", boards: ["CBSE", "ICSE", "ISC"], color: "from-primary to-accent" },
    { name: "Chemistry", icon: "🧪", boards: ["CBSE", "ICSE", "ISC"], color: "from-accent to-primary" },
    { name: "Computer Science", icon: "💻", boards: ["CBSE", "ICSE", "ISC"], color: "from-primary-glow to-accent" },
    { name: "Information Technology", icon: "🖥️", boards: ["CBSE"], color: "from-primary to-primary-glow" },
    { name: "Python Programming", icon: "🐍", boards: ["All"], color: "from-accent-glow to-primary" },
    { name: "MySQL", icon: "🗄️", boards: ["All"], color: "from-primary to-accent-glow" },
  ];

  const skills = [
    { 
      category: "Languages", 
      items: ["English (Proficient)", "Bengali (Mother Tongue)", "Hindi (Proficient)"],
      icon: "🌐",
      color: "from-primary to-primary-dark"
    },
    { 
      category: "Technical", 
      items: ["Python Programming", "MySQL Database", "Cyber Security", "Graphics Design"],
      icon: "⚙️",
      color: "from-accent to-accent-glow"
    },
    { 
      category: "Soft Skills", 
      items: ["Leadership", "Team Work", "Time Management", "Communication"],
      icon: "🎯",
      color: "from-primary to-accent"
    },
  ];

  const certifications = [
    { name: "Cyber Security - Google", icon: "🔐" },
    { name: "Cyber Security - IBM", icon: "🛡️" },
    { name: "Gen AI - Google AI Essentials", icon: "🤖" },
    { name: "Graphics Designing", icon: "🎨" },
  ];

  const achievements = [
    { text: "Successful Coordinator SMF in PR Team, Logistics and Hospitality", icon: Star },
    { text: "Best Working Member TAG in IEM Management Building", icon: Award },
    { text: "Volunteer of Ecstatia 2026 in UEMK", icon: Target },
    { text: "Highest Referral in IEEE Event 'Wired of Words'", icon: Award },
    { text: "Member of IEEE MTTS", icon: GraduationCap },
    { text: "Member of IEEE CS", icon: GraduationCap },
    { text: "Member of Google Developer Groups (UEM & IEM Campus)", icon: Star },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-gradient" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>
      
      <div className="pt-32 pb-16 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16 space-y-6 animate-in fade-in slide-in-from-top duration-700">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-effect border-primary/30">
              <GraduationCap className="h-4 w-4 text-primary-glow" />
              <span className="text-sm font-semibold text-primary">Professional Tutoring</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-gradient">
                Tutoring Services
              </span>
            </h1>
            
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <span className="text-primary-glow font-bold">3+ Years</span> of Experience | Classes <span className="text-accent font-bold">8-12</span> | CBSE, ICSE & ISC
            </p>
          </div>

          {/* Subjects */}
          <section className="mb-20 animate-in fade-in slide-in-from-bottom duration-700">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4">Subjects <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">I Teach</span></h2>
              <p className="text-xl text-muted-foreground">Comprehensive coverage across multiple disciplines</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subjects.map((subject, index) => (
                <Card key={subject.name} className="glass-effect border-primary/30 hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 group" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-500 shadow-glow`}>
                      {subject.icon}
                    </div>
                    <CardTitle className="text-xl font-black group-hover:text-primary-glow transition-colors">{subject.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {subject.boards.map((board) => (
                        <Badge key={board} className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 transition-colors">{board}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-20 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4">Skills & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Expertise</span></h2>
              <p className="text-xl text-muted-foreground">Comprehensive skill set for effective teaching</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {skills.map((skillSet, index) => (
                <Card key={skillSet.category} className="glass-effect border-primary/30 hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 group" style={{ animationDelay: `${index * 150}ms` }}>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${skillSet.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 shadow-glow`}>
                        {skillSet.icon}
                      </div>
                      <CardTitle className="text-2xl font-black group-hover:text-primary-glow transition-colors">{skillSet.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {skillSet.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 p-3 rounded-lg glass-effect border-border/30 hover:border-primary/50 transition-all group/item">
                          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                          <span className="text-sm font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-20 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4"><span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Certifications</span></h2>
              <p className="text-xl text-muted-foreground">Professional credentials and achievements</p>
            </div>
            <Card className="glass-effect border-primary/30 hover:shadow-elegant transition-all duration-500">
              <CardContent className="pt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {certifications.map((cert, index) => (
                    <div key={cert.name} className="flex items-center gap-5 p-6 rounded-2xl glass-effect border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 group" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 shadow-glow flex-shrink-0">
                        {cert.icon}
                      </div>
                      <span className="text-base font-bold group-hover:text-primary-glow transition-colors">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Achievements */}
          <section className="animate-in fade-in slide-in-from-bottom duration-700 delay-400">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-4">Achievements & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Activities</span></h2>
              <p className="text-xl text-muted-foreground">Recognitions and contributions</p>
            </div>
            <Card className="glass-effect border-accent/30 hover:shadow-elegant transition-all duration-500">
              <CardContent className="pt-8">
                <ul className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-4 p-5 rounded-xl glass-effect border-border/50 hover:border-accent/50 transition-all duration-500 hover:-translate-y-1 group" style={{ animationDelay: `${index * 80}ms` }}>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-glow-accent">
                        <achievement.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-base leading-relaxed group-hover:text-accent-glow transition-colors">{achievement.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Tutoring;
