import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function AddStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: 'Emma',
    lastName: 'Rodriguez',
    dateOfBirth: '2015-08-15',
    grade: '4',
    primaryTeacher: 'Maria Johnson',
    guardianName: 'Carlos Rodriguez',
    guardianEmail: 'c.rodriguez@email.com',
    guardianPhone: '(555) 234-5678',
    emergencyContact: 'Sofia Rodriguez',
    emergencyPhone: '(555) 234-5679',
    medicalNotes: 'Allergic to peanuts',
    iepStatus: 'None',
    section504: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate student ID
    const studentId = `S-2026-${Math.floor(Math.random() * 9000) + 1000}`;
    const studentName = `${formData.firstName} ${formData.lastName}`;
    
    toast.success('Student added successfully');
    navigate('/admin/students/success', {
      state: { studentId, studentName }
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <Link to="/admin/students" className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] mb-4 md:mb-6 text-sm md:text-base">
          <ArrowLeft className="w-4 h-4" />
          Back to Students
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">Add New Student</h1>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6 border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A]">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentId" className="text-[#4A4A4A]">Student ID *</Label>
                  <Input
                    id="studentId"
                    required
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                    placeholder="STU-001"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth" className="text-[#4A4A4A]">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-[#4A4A4A]">First Name *</Label>
                  <Input
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-[#4A4A4A]">Last Name *</Label>
                  <Input
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="grade" className="text-[#4A4A4A]">Grade *</Label>
                  <select
                    id="grade"
                    required
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full border border-[#D0D0D0] rounded-md px-3 py-2 text-[#1A1A1A]"
                  >
                    <option value="">Select Grade</option>
                    <option value="K">Kindergarten</option>
                    <option value="1">1st Grade</option>
                    <option value="2">2nd Grade</option>
                    <option value="3">3rd Grade</option>
                    <option value="4">4th Grade</option>
                    <option value="5">5th Grade</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="primaryTeacher" className="text-[#4A4A4A]">Primary Teacher *</Label>
                  <select
                    id="primaryTeacher"
                    required
                    value={formData.primaryTeacher}
                    onChange={(e) => setFormData({ ...formData, primaryTeacher: e.target.value })}
                    className="w-full border border-[#D0D0D0] rounded-md px-3 py-2 text-[#1A1A1A]"
                  >
                    <option value="">Select Teacher</option>
                    <option value="TCH-001">Mrs. Maria Johnson</option>
                    <option value="TCH-002">Mr. David Chen</option>
                    <option value="TCH-003">Ms. Jennifer Martinez</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A]">Guardian Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="guardianName" className="text-[#4A4A4A]">Primary Guardian Name *</Label>
                <Input
                  id="guardianName"
                  required
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  className="border-[#D0D0D0] text-[#1A1A1A]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="guardianEmail" className="text-[#4A4A4A]">Guardian Email *</Label>
                  <Input
                    id="guardianEmail"
                    type="email"
                    required
                    value={formData.guardianEmail}
                    onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <Label htmlFor="guardianPhone" className="text-[#4A4A4A]">Guardian Phone *</Label>
                  <Input
                    id="guardianPhone"
                    type="tel"
                    required
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContact" className="text-[#4A4A4A]">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone" className="text-[#4A4A4A]">Emergency Phone</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    className="border-[#D0D0D0] text-[#1A1A1A]"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-[#D0D0D0]">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A]">Special Education & Medical</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="iepStatus" className="text-[#4A4A4A]">IEP Status</Label>
                  <select
                    id="iepStatus"
                    value={formData.iepStatus}
                    onChange={(e) => setFormData({ ...formData, iepStatus: e.target.value })}
                    className="w-full border border-[#D0D0D0] rounded-md px-3 py-2 text-[#1A1A1A]"
                  >
                    <option value="None">None</option>
                    <option value="Active">Active IEP</option>
                    <option value="Pending">Pending Evaluation</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 md:pt-6">
                  <input
                    type="checkbox"
                    id="section504"
                    checked={formData.section504}
                    onChange={(e) => setFormData({ ...formData, section504: e.target.checked })}
                    className="w-4 h-4 text-[#333333] border-[#D0D0D0] rounded"
                  />
                  <Label htmlFor="section504" className="text-[#4A4A4A] cursor-pointer">
                    Has 504 Plan
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="medicalNotes" className="text-[#4A4A4A]">Medical Notes / Accommodations</Label>
                <textarea
                  id="medicalNotes"
                  value={formData.medicalNotes}
                  onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                  rows={4}
                  className="w-full border border-[#D0D0D0] rounded-md px-3 py-2 text-[#1A1A1A]"
                  placeholder="Any medical conditions, allergies, or accommodations..."
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/students')}
              className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5] w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#333333] hover:bg-[#1A1A1A] text-white w-full sm:w-auto"
            >
              Add Student
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}