import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Tutoring = () => {
  const subjects = [
    { name: "Mathematics", icon: "🔢", boards: ["CBSE", "ICSE", "ISC"] },
    { name: "Science", icon: "🔬", boards: ["CBSE", "ICSE"] },
    { name: "Physics", icon: "⚡", boards: ["CBSE", "ICSE", "ISC"] },
    { name: "Chemistry", icon: "🧪", boards: ["CBSE", "ICSE", "ISC"] },
    { name: "Computer Science", icon: "💻", boards: ["CBSE", "ICSE", "ISC"] },
    { name: "Information Technology", icon: "🖥️", boards: ["CBSE"] },
    { name: "Python Programming", icon: "🐍", boards: ["All"] },
    { name: "MySQL", icon: "🗄️", boards: ["All"] },
  ];

  const skills = [
    { category: "Languages", items: ["English (Proficient)", "Bengali (Mother Tongue)", "Hindi (Proficient)"] },
    { category: "Technical", items: ["Python Programming", "MySQL Database", "Cyber Security", "Graphics Design"] },
    { category: "Soft Skills", items: ["Leadership", "Team Work", "Time Management", "Communication"] },
  ];

  const certifications = [
    "Cyber Security - Google",
    "Cyber Security - IBM",
    "Gen AI - Google AI Essentials",
    "Graphics Designing",
  ];

  const achievements = [
    "Successful Coordinator SMF in PR Team, Logistics and Hospitality",
    "Best Working Member TAG in IEM Management Building",
    "Volunteer of Ecstatia 2026 in UEMK",
    "Highest Referral in IEEE Event 'Wired of Words'",
    "Member of IEEE MTTS",
    "Member of IEEE CS",
    "Member of Google Developer Groups (UEM & IEM Campus)",
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Tutoring Services
            </h1>
            <p className="text-xl text-muted-foreground">
              3+ Years of Experience | Classes 8-12 | CBSE, ICSE & ISC
            </p>
          </div>

          {/* Subjects */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Subjects I Teach</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {subjects.map((subject) => (
                <Card key={subject.name} className="border-border hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="text-4xl mb-2">{subject.icon}</div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {subject.boards.map((board) => (
                        <Badge key={board} variant="secondary">{board}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Skills & Expertise</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {skills.map((skillSet) => (
                <Card key={skillSet.category} className="border-border">
                  <CardHeader>
                    <CardTitle>{skillSet.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {skillSet.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Certifications</h2>
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <span className="text-2xl">✓</span>
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Achievements & Activities</h2>
            <Card className="border-border">
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-sm">★</span>
                      </span>
                      <span>{achievement}</span>
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
