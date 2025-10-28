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
        
        const { error: signInError } = await supabase.auth.signInWithPassword({
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

          if (signUpData.user) {
            await supabase.from("user_roles").insert({
              user_id: signUpData.user.id,
              role: "admin",
            });
          }
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
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 flex items-center justify-center">
        <Card className="w-full max-w-md border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="For students: your name (lowercase)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Admin: "teacher" | Students: your name in lowercase
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password (Admin Only)</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Leave empty for students"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  New student?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="text-primary hover:underline font-medium"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
