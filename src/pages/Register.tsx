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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const phoneSchema = z.object({
  phoneNumber: z.string().trim().min(10, "Valid phone number required").max(15),
});

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
  const [step, setStep] = useState<"phone" | "otp" | "details">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
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

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      phoneSchema.parse({ phoneNumber });
      setLoading(true);

      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (error) throw error;

      toast.success("OTP sent to your phone!");
      setStep("otp");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        console.error("OTP error:", error);
        toast.error("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (otp.length !== 6) {
        toast.error("Please enter a valid 6-digit OTP");
        return;
      }

      setLoading(true);
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms',
      });

      if (error) throw error;

      if (data.user) {
        // Check if student record exists
        const { data: existingStudent } = await supabase
          .from("students")
          .select("*")
          .eq("user_id", data.user.id)
          .single();

        if (existingStudent) {
          toast.success("Welcome back!");
          navigate("/student");
        } else {
          toast.success("Phone verified! Please complete your profile.");
          setStep("details");
        }
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = registerSchema.parse(formData);
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("User not found");

      // Add student role
      await supabase.from("user_roles").insert({
        user_id: user.id,
        role: "student",
      });

      // Create student record
      const { error: studentError } = await supabase.from("students").insert({
        user_id: user.id,
        full_name: validated.fullName,
        phone_number: phoneNumber,
        date_of_birth: validated.dateOfBirth,
        guardian_number: validated.guardianNumber,
        school_name: validated.schoolName,
        class_level: validated.classLevel,
        year: parseInt(validated.year),
        monthly_fees: parseFloat(validated.monthlyFees),
      });

      if (studentError) throw studentError;

      toast.success("Registration completed successfully!");
      navigate("/student");
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <Card className="w-full max-w-md mx-auto shadow-xl border-border/50 backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {step === "phone" && "Welcome"}
              {step === "otp" && "Verify Phone"}
              {step === "details" && "Complete Profile"}
            </CardTitle>
            <CardDescription className="text-center">
              {step === "phone" && "Enter your phone number to get started"}
              {step === "otp" && "Enter the 6-digit code sent to your phone"}
              {step === "details" && "Tell us about yourself"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "phone" && (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="h-12 text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    Include country code (e.g., +91 for India)
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>

                <div className="text-center pt-2">
                  <p className="text-sm text-muted-foreground">
                    Already registered?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/auth")}
                      className="text-primary hover:underline font-semibold"
                    >
                      Login
                    </button>
                  </p>
                </div>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    Sent to {phoneNumber}
                  </p>
                </div>

                <div className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </Button>

                  <Button 
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setStep("phone");
                      setOtp("");
                    }}
                  >
                    Change phone number
                  </Button>
                </div>
              </form>
            )}

            {step === "details" && (
              <form onSubmit={handleCompleteRegistration} className="space-y-4">
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
                  <Label htmlFor="guardianNumber">Guardian's Phone *</Label>
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="classLevel">Class *</Label>
                    <Input
                      id="classLevel"
                      name="classLevel"
                      placeholder="e.g., 10"
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
                </div>

                <div className="space-y-2">
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

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold"
                  disabled={loading}
                >
                  {loading ? "Completing..." : "Complete Registration"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
