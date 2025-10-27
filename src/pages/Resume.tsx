import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Resume = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-border">
            <CardHeader className="text-center space-y-4 pb-6">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Snehasish Das
              </h1>
              <p className="text-muted-foreground">B.Tech in CSE (Cyber Security) | Educator | Tech Enthusiast</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span>📧 snehasishxofficial@gmail.com</span>
                <span>📞 +91 7439115647</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Personal Information */}
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Date of Birth:</span>
                    <span className="ml-2 font-medium">27th April, 2005</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Blood Group:</span>
                    <span className="ml-2 font-medium">B-</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Father's Name:</span>
                    <span className="ml-2 font-medium">Sukhen Das</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Mother's Name:</span>
                    <span className="ml-2 font-medium">Chaitali Das</span>
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <span className="text-muted-foreground">Address:</span>
                  <span className="ml-2">A26 Vidyasagar Park, Nabanagar, Birati, Kolkata 700051</span>
                </div>
              </section>

              <Separator />

              {/* Education */}
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  Education
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <h3 className="font-semibold text-lg">B.Tech in Computer Science Engineering (Cyber Security)</h3>
                    <p className="text-muted-foreground">University of Engineering & Management, Kolkata</p>
                    <p className="text-sm text-muted-foreground mt-1">Currently Pursuing</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <h3 className="font-semibold text-lg">Class 12 (Higher Secondary)</h3>
                    <p className="text-muted-foreground">Passed in 2023</p>
                    <p className="text-sm mt-1">Percentage: 75%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <h3 className="font-semibold text-lg">Class 10 (Secondary)</h3>
                    <p className="text-muted-foreground">Passed in 2021</p>
                    <p className="text-sm mt-1">Percentage: 82%</p>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Professional Experience */}
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  Teaching Experience
                </h2>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h3 className="font-semibold text-lg">Private Tutor</h3>
                  <p className="text-muted-foreground">3+ Years of Experience</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Teaching Mathematics, Science, Physics, Chemistry, Computer Science, IT</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Specialized in Python Programming and MySQL Database</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Classes 8-12 (CBSE, ICSE, ISC)</span>
                    </li>
                  </ul>
                </div>
              </section>

              <Separator />

              {/* Skills */}
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  Skills
                </h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "MySQL", "Cyber Security", "Graphics Design", "Computer Science"].map((skill) => (
                        <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {["English (Proficient)", "Bengali (Mother Tongue)", "Hindi (Proficient)"].map((lang) => (
                        <span key={lang} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Soft Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Leadership", "Team Work", "Time Management", "Communication"].map((skill) => (
                        <span key={skill} className="px-3 py-1 rounded-full bg-secondary text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Strengths & Weaknesses */}
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  Personal Traits
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <h3 className="font-semibold text-lg mb-2">Strengths</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        <span>Leadership Skills</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        <span>Time Management</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <h3 className="font-semibold text-lg mb-2">Areas for Growth</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="text-muted-foreground">•</span>
                        <span>Managing Stress</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-muted-foreground">•</span>
                        <span>Overthinking</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Resume;
