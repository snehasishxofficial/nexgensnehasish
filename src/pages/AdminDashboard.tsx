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
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Manage your tuition students</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
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
