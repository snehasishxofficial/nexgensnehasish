import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LogOut, CheckCircle } from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState<any>(null);
  const [feeRecords, setFeeRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStudentAccess();
  }, []);

  const checkStudentAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    const { data: studentData } = await supabase
      .from("students")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    if (!studentData) {
      toast.error("Student profile not found");
      navigate("/");
      return;
    }

    setStudent(studentData);
    fetchFeeRecords(studentData.id);
  };

  const fetchFeeRecords = async (studentId: string) => {
    try {
      const { data, error } = await supabase
        .from("fee_records")
        .select("*")
        .eq("student_id", studentId)
        .order("year", { ascending: false })
        .order("month", { ascending: true });

      if (error) throw error;
      setFeeRecords(data || []);
    } catch (error) {
      console.error("Error fetching fee records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async (recordId: string) => {
    try {
      const { error } = await supabase
        .from("fee_records")
        .update({ paid: true, paid_date: new Date().toISOString() })
        .eq("id", recordId);

      if (error) throw error;

      toast.success("Fee marked as paid!");
      fetchFeeRecords(student.id);
    } catch (error) {
      console.error("Error updating fee:", error);
      toast.error("Failed to update fee status");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast.success("Logged out successfully");
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{student?.full_name}</h1>
            <p className="text-muted-foreground">Student Dashboard</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div><span className="text-muted-foreground">School:</span> {student?.school_name}</div>
              <div><span className="text-muted-foreground">Class:</span> {student?.class_level}</div>
              <div><span className="text-muted-foreground">Guardian Phone:</span> {student?.guardian_number}</div>
              <div><span className="text-muted-foreground">Monthly Fees:</span> ₹{student?.monthly_fees}</div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Fee Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {feeRecords.slice(0, 3).map((record) => (
                  <div key={record.id} className="flex justify-between items-center">
                    <span>{new Date(2024, record.month - 1).toLocaleString('default', { month: 'long' })} {record.year}</span>
                    <Badge variant={record.paid ? "default" : "secondary"}>
                      {record.paid ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Fee Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {feeRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-medium">
                      {new Date(2024, record.month - 1).toLocaleString('default', { month: 'long' })} {record.year}
                    </p>
                    <p className="text-sm text-muted-foreground">₹{record.amount}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={record.paid ? "default" : "secondary"}>
                      {record.paid ? "Paid" : "Pending"}
                    </Badge>
                    {!record.paid && (
                      <Button size="sm" onClick={() => handleMarkPaid(record.id)}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Paid
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
