import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().optional(),
});

const Auth = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        checkUserRoleAndRedirect(session.user.id);
      }
    });
  }, []);

  const checkUserRoleAndRedirect = async (userId: string) => {
    try {
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();

      if (roleData?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (error) {
      console.error("Error checking role:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = loginSchema.parse({ username, password });
      setLoading(true);

      // Simple admin check
      if (validated.username.toLowerCase() === "teacher" && password === "3956Kolk@t.") {
        const adminEmail = "teacher@tuition.local";
        
        let { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: "3956Kolk@t.",
        });

        if (signInError) {
          // Create admin account if doesn't exist
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: adminEmail,
            password: "3956Kolk@t.",
            options: {
              data: { full_name: "Teacher Admin" },
              emailRedirectTo: `${window.location.origin}/`,
            },
          });

          if (signUpError) throw signUpError;
          signInData = signUpData;
        }

        // Ensure admin role is assigned
        if (signInData?.user) {
          const { data: { session } } = await supabase.auth.getSession();
          await supabase.functions.invoke('assign-admin-role', {
            body: { userId: signInData.user.id },
            headers: {
              Authorization: `Bearer ${session?.access_token}`
            }
          });
        }
        
        toast.success("Welcome, Teacher!");
        navigate("/admin");
        return;
      }

      // Student login
      const studentEmail = `${validated.username.toLowerCase()}@student.local`;
      
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: studentEmail,
        password: "student123",
      });

      if (signInError) {
        toast.error("Account not found. Please register first.");
      } else {
        toast.success("Welcome back!");
        navigate("/student");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        console.error("Login error:", error);
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />
      
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>
      
      <div className="relative pt-24 pb-16 px-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom duration-700">
          <Card className="glass-effect border-primary/30 shadow-elegant">
            <CardHeader className="space-y-5 text-center pb-8">
              <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-primary-glow to-accent flex items-center justify-center shadow-glow mb-2">
                <svg className="w-10 h-10 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-4xl font-black bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-gradient">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Sign in to access your personalized dashboard
                </CardDescription>
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-effect border-primary/30">
                <div className="w-2 h-2 rounded-full bg-primary-glow animate-pulse" />
                <span className="text-sm font-semibold text-primary">Secure Login Portal</span>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="username" className="text-base font-semibold flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="h-12 glass-effect border-border/50 focus:border-primary focus:shadow-glow transition-all text-base"
                  />
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Admin: "teacher" | Students: lowercase name
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-base font-semibold flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Admin only - students leave empty"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 glass-effect border-border/50 focus:border-primary focus:shadow-glow transition-all text-base"
                  />
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/5 border border-accent/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Students don't need a password
                    </p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="gradient"
                  className="w-full h-14 text-base font-bold group"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <div className="w-5 h-5 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Sign In
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  )}
                </Button>

                <div className="relative py-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-card px-4 text-muted-foreground font-semibold">New to NexGen?</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="w-full h-14 rounded-xl border-2 border-primary/50 hover:bg-primary/10 hover:border-primary transition-all text-base font-semibold flex items-center justify-center gap-3 group glass-effect"
                >
                  Create Student Account
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
