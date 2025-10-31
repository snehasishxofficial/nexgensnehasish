import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { LogOut, Trash2, Users, DollarSign, Calendar, Edit, CheckCircle } from "lucide-react";

interface Student {
  id: string;
  user_id: string;
  full_name: string;
  date_of_birth: string;
  guardian_number: string;
  school_name: string;
  class_level: string;
  year: number;
  monthly_fees: number;
  joined_date: string;
  is_active: boolean;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [feeDialogOpen, setFeeDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [feeMonth, setFeeMonth] = useState<string>("");
  const [feeYear, setFeeYear] = useState<string>("");
  const [feeAmount, setFeeAmount] = useState<string>("");

  useEffect(() => {
    checkAdminAccess();
    fetchStudents();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .single();

    if (roleData?.role !== "admin") {
      toast.error("Access denied. Admin only.");
      navigate("/");
    }
  };

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("joined_date", { ascending: false });

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const handleEditStudent = async () => {
    if (!editingStudent) return;

    try {
      const { error } = await supabase
        .from("students")
        .update({
          full_name: editingStudent.full_name,
          guardian_number: editingStudent.guardian_number,
          class_level: editingStudent.class_level,
          year: editingStudent.year,
          date_of_birth: editingStudent.date_of_birth,
          joined_date: editingStudent.joined_date,
        })
        .eq("id", editingStudent.id);

      if (error) throw error;

      toast.success("Student details updated successfully");
      setEditDialogOpen(false);
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Failed to update student details");
    }
  };

  const handleMarkFeesPaid = async () => {
    if (!selectedStudent || !feeMonth || !feeYear || !feeAmount) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const month = parseInt(feeMonth);
      const year = parseInt(feeYear);
      const amount = parseFloat(feeAmount);

      // Check if record already exists for this month/year
      const { data: existing } = await supabase
        .from("fee_records")
        .select("id, paid")
        .eq("student_id", selectedStudent.id)
        .eq("month", month)
        .eq("year", year)
        .maybeSingle();

      if (existing) {
        if (existing.paid) {
          toast.error("Fees already marked as paid for this month");
          return;
        }
        // Update existing record
        const { error } = await supabase
          .from("fee_records")
          .update({
            paid: true,
            paid_date: new Date().toISOString(),
            amount: amount
          })
          .eq("id", existing.id);

        if (error) throw error;
      } else {
        // Create new record
        const { error } = await supabase
          .from("fee_records")
          .insert({
            student_id: selectedStudent.id,
            month: month,
            year: year,
            amount: amount,
            paid: true,
            paid_date: new Date().toISOString()
          });

        if (error) throw error;
      }

      toast.success("Fees marked as paid successfully");
      setFeeDialogOpen(false);
      setFeeMonth("");
      setFeeYear("");
      setFeeAmount("");
    } catch (error) {
      console.error("Error marking fees as paid:", error);
      toast.error("Failed to mark fees as paid");
    }
  };

  const handleDeleteStudent = async (studentId: string, userId: string) => {
    if (!confirm("Are you sure you want to delete this student? This will permanently delete their account and all their data.")) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Not authenticated");
        return;
      }

      // Call the delete-account edge function
      const { error: deleteError } = await supabase.functions.invoke('delete-account', {
        body: { userId },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (deleteError) throw deleteError;

      toast.success("Student account deleted successfully");
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast.success("Logged out successfully");
  };

  const stats = {
    total: students.length,
    active: students.filter(s => s.is_active).length,
    totalRevenue: students.reduce((sum, s) => sum + Number(s.monthly_fees), 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 md:p-8">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Enhanced Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
          <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border/50 shadow-[0_0_50px_rgba(147,51,234,0.15)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-primary-glow to-accent flex items-center justify-center shadow-glow">
                  <svg className="w-8 h-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                    Teacher Dashboard
                  </h1>
                  <p className="text-muted-foreground mt-1 text-sm">Manage your students and track payments</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" size="lg" className="border-primary/50 hover:bg-primary/10 hover:border-primary">
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-xl group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-4xl font-bold text-primary">{stats.total}</div>
              <p className="text-xs text-muted-foreground mt-2">Registered students</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-green-500/50 transition-all hover:shadow-xl group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Students</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 group-hover:scale-110 transition-all">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-4xl font-bold text-green-500">{stats.active}</div>
              <p className="text-xs text-muted-foreground mt-2">Currently enrolled</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-accent/50 transition-all hover:shadow-xl group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-3 relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                  <DollarSign className="h-5 w-5 text-accent" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-4xl font-bold text-accent">₹{stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-2">Expected per month</p>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>All Students</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground py-8">Loading students...</p>
            ) : students.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No students registered yet</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>School</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Guardian Phone</TableHead>
                      <TableHead>Monthly Fees</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.full_name}</TableCell>
                        <TableCell>{student.school_name}</TableCell>
                        <TableCell>{student.class_level}</TableCell>
                        <TableCell>{student.guardian_number}</TableCell>
                        <TableCell>₹{student.monthly_fees}</TableCell>
                        <TableCell>
                          {new Date(student.joined_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={student.is_active ? "default" : "secondary"}>
                            {student.is_active ? "Active" : "Left"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Dialog open={feeDialogOpen && selectedStudent?.id === student.id} onOpenChange={(open) => {
                              setFeeDialogOpen(open);
                              if (open) {
                                setSelectedStudent(student);
                                setFeeAmount(student.monthly_fees.toString());
                                const now = new Date();
                                setFeeMonth((now.getMonth() + 1).toString());
                                setFeeYear(now.getFullYear().toString());
                              }
                            }}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Mark Fees Paid"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Mark Fees as Paid - {student.full_name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="fee-month">Month</Label>
                                    <Select value={feeMonth} onValueChange={setFeeMonth}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select month" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {[
                                          { value: "1", label: "January" },
                                          { value: "2", label: "February" },
                                          { value: "3", label: "March" },
                                          { value: "4", label: "April" },
                                          { value: "5", label: "May" },
                                          { value: "6", label: "June" },
                                          { value: "7", label: "July" },
                                          { value: "8", label: "August" },
                                          { value: "9", label: "September" },
                                          { value: "10", label: "October" },
                                          { value: "11", label: "November" },
                                          { value: "12", label: "December" }
                                        ].map(m => (
                                          <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="fee-year">Year</Label>
                                    <Input
                                      id="fee-year"
                                      type="number"
                                      value={feeYear}
                                      onChange={(e) => setFeeYear(e.target.value)}
                                      placeholder="2024"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="fee-amount">Amount (₹)</Label>
                                    <Input
                                      id="fee-amount"
                                      type="number"
                                      value={feeAmount}
                                      onChange={(e) => setFeeAmount(e.target.value)}
                                      placeholder="Enter amount"
                                    />
                                  </div>
                                  <Button onClick={handleMarkFeesPaid} className="w-full">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Confirm Payment
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Dialog open={editDialogOpen && editingStudent?.id === student.id} onOpenChange={(open) => {
                              setEditDialogOpen(open);
                              if (open) setEditingStudent(student);
                            }}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit Student Details"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Edit Student Details</DialogTitle>
                                </DialogHeader>
                                {editingStudent && (
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-name">Full Name</Label>
                                      <Input
                                        id="edit-name"
                                        value={editingStudent.full_name}
                                        onChange={(e) => setEditingStudent({...editingStudent, full_name: e.target.value})}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-dob">Date of Birth</Label>
                                      <Input
                                        id="edit-dob"
                                        type="date"
                                        value={editingStudent.date_of_birth}
                                        onChange={(e) => setEditingStudent({...editingStudent, date_of_birth: e.target.value})}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-guardian">Guardian Phone</Label>
                                      <Input
                                        id="edit-guardian"
                                        value={editingStudent.guardian_number}
                                        onChange={(e) => setEditingStudent({...editingStudent, guardian_number: e.target.value})}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-class">Class</Label>
                                      <Input
                                        id="edit-class"
                                        value={editingStudent.class_level}
                                        onChange={(e) => setEditingStudent({...editingStudent, class_level: e.target.value})}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-year">Year</Label>
                                      <Input
                                        id="edit-year"
                                        type="number"
                                        value={editingStudent.year}
                                        onChange={(e) => setEditingStudent({...editingStudent, year: parseInt(e.target.value)})}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-joined">Joining Date</Label>
                                      <Input
                                        id="edit-joined"
                                        type="date"
                                        value={editingStudent.joined_date.split('T')[0]}
                                        onChange={(e) => setEditingStudent({...editingStudent, joined_date: e.target.value})}
                                      />
                                    </div>
                                    <Button onClick={handleEditStudent} className="w-full">
                                      Save Changes
                                    </Button>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteStudent(student.id, student.user_id)}
                              title="Delete Student"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
