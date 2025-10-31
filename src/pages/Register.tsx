import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";
import { z } from "zod";

const registerSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  guardianNumber: z.string().trim().min(10, "Valid phone number required").max(15),
  schoolName: z.string().trim().min(1, "School name is required").max(200),
  classLevel: z.string().trim().min(1, "Class is required"),
  year: z.string().min(4, "Year is required"),
  monthlyFees: z.string().min(1, "Fees amount is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    guardianNumber: "",
    schoolName: "",
    classLevel: "",
    year: new Date().getFullYear().toString(),
    monthlyFees: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = registerSchema.parse(formData);
      setLoading(true);

      // Create username from full name (lowercase, no spaces)
      const username = validated.fullName.toLowerCase().replace(/\s+/g, '');
      const studentEmail = `${username}@student.local`;

      // Create auth account for student
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: studentEmail,
        password: "student123", // Default password
        options: {
          data: { full_name: validated.fullName },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Add student role
        await supabase.from("user_roles").insert({
          user_id: authData.user.id,
          role: "student",
        });

        // Create student record
        const { error: studentError } = await supabase.from("students").insert({
          user_id: authData.user.id,
          full_name: validated.fullName,
          date_of_birth: validated.dateOfBirth,
          guardian_number: validated.guardianNumber,
          school_name: validated.schoolName,
          class_level: validated.classLevel,
          year: parseInt(validated.year),
          monthly_fees: parseFloat(validated.monthlyFees),
        });

        if (studentError) throw studentError;

        toast.success(`Registration successful! Your username is: ${username}`);
        toast.info("You can now login with your username (no password needed)");
        navigate("/auth");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        console.error("Registration error:", error);
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <Card className="w-full max-w-2xl mx-auto border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Student Registration</CardTitle>
            <CardDescription>
              Fill in your details to register for tuition classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianNumber">Guardian's Phone Number *</Label>
                  <Input
                    id="guardianNumber"
                    name="guardianNumber"
                    type="tel"
                    value={formData.guardianNumber}
                    onChange={handleChange}
                    required
                    maxLength={15}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name *</Label>
                  <Input
                    id="schoolName"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    required
                    maxLength={200}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="classLevel">Class *</Label>
                  <Input
                    id="classLevel"
                    name="classLevel"
                    placeholder="e.g., 10, 12"
                    value={formData.classLevel}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    min="2020"
                    max="2030"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="monthlyFees">Monthly Fees (₹) *</Label>
                  <Input
                    id="monthlyFees"
                    name="monthlyFees"
                    type="number"
                    step="0.01"
                    value={formData.monthlyFees}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>

              <div className="text-center pt-2">
                <p className="text-sm text-muted-foreground">
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/auth")}
                    className="text-primary hover:underline font-medium"
                  >
                    Login here
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

export default Register;
