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
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="relative pt-24 pb-16 px-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom duration-700">
          {/* Floating Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl -z-10 rounded-full" />
          
          <Card className="border-border/50 shadow-[0_0_50px_rgba(147,51,234,0.1)] backdrop-blur-sm bg-card/95">
            <CardHeader className="space-y-3 text-center pb-6">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow mb-2">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-base">
                Sign in to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="h-11 bg-background/50 border-border/50 focus:border-primary transition-all"
                  />
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60" />
                    Admin: "teacher" | Students: lowercase name
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Admin only - students leave empty"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 bg-background/50 border-border/50 focus:border-primary transition-all"
                  />
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent/60" />
                    Students don't need a password
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover:shadow-glow text-base font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Signing in...
                    </span>
                  ) : "Sign In"}
                </Button>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-3 text-muted-foreground">New to NexGen?</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="w-full h-11 rounded-md border border-primary/50 hover:bg-primary/10 hover:border-primary transition-all text-sm font-medium flex items-center justify-center gap-2 group"
                >
                  Create Student Account
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
