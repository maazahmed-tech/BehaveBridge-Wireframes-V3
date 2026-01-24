import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { User, Mail, ArrowLeft, BookOpen, X } from 'lucide-react';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

export default function ViewTeacherAccount() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Unlink Modal State
  const [unlinkOpen, setUnlinkOpen] = useState(false);
  const [studentToUnlink, setStudentToUnlink] = useState<{ id: string; name: string } | null>(null);

  // Mock data
  const teacher = {
    name: 'Maria Johnson',
    email: 'maria.johnson@lincolnelementary.edu',
    phone: '(555) 234-5678',
    status: 'Active',
    role: 'Classroom Teacher',
  };

  // Get assigned students
  const assignedStudents = STUDENTS.slice(0, 5).map((student) => ({
    ...student,
  }));

  const handleUnlink = (student: { id: string; name: string }) => {
    setStudentToUnlink(student);
    setUnlinkOpen(true);
  };

  const handleConfirmUnlink = () => {
    if (studentToUnlink) {
      toast.success(`${studentToUnlink.name} has been unlinked from ${teacher.name}`);
      setUnlinkOpen(false);
      setStudentToUnlink(null);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <Link to="/admin/teachers" className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] text-sm mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Teacher Management
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl text-[#1A1A1A]">{teacher.name}</h1>
              <p className="text-sm text-[#757575] mt-1">Teacher Account Details</p>
            </div>
            <Badge className={`${
              teacher.status === 'Active' ? 'bg-[#333333]' : 'bg-[#757575]'
            } text-white`}>
              {teacher.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Account Information */}
          <Card className="border-[#D0D0D0] p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-[#333333]" />
              <h2 className="text-lg font-medium text-[#1A1A1A]">Account Information</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-[#757575]">Full Name</p>
                <p className="text-[#1A1A1A] font-medium">{teacher.name}</p>
              </div>
              <div>
                <p className="text-sm text-[#757575]">Role</p>
                <p className="text-[#1A1A1A]">{teacher.role}</p>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="border-[#D0D0D0] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-[#333333]" />
              <h2 className="text-lg font-medium text-[#1A1A1A]">Contact Information</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-[#757575]">Email Address</p>
                <p className="text-[#1A1A1A] break-all">{teacher.email}</p>
              </div>
              <div>
                <p className="text-sm text-[#757575]">Phone Number</p>
                <p className="text-[#1A1A1A]">{teacher.phone}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Assigned Students */}
        <Card className="border-[#D0D0D0] p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-[#333333]" />
            <h2 className="text-lg font-medium text-[#1A1A1A]">Assigned Students</h2>
          </div>

          {assignedStudents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#757575]">No students currently assigned</p>
            </div>
          ) : (
            <div className="bg-white border border-[#D0D0D0] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F5F5F5] border-b border-[#D0D0D0]">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Student Name</th>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Student ID</th>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Grade</th>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedStudents.map((student, index) => (
                    <tr
                      key={student.id}
                      className={`border-b border-[#E0E0E0] hover:bg-[#FAFAFA] ${
                        index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                      }`}
                    >
                      <td
                        className="p-4 text-[#1A1A1A] font-medium cursor-pointer hover:underline"
                        onClick={() => navigate(`/admin/students/${student.id}`)}
                      >
                        {student.name}
                      </td>
                      <td className="p-4 text-[#4A4A4A]">{student.id}</td>
                      <td className="p-4 text-[#4A4A4A]">Grade {student.grade}</td>
                      <td className="p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnlink({ id: student.id, name: student.name });
                          }}
                          className="text-[#757575] hover:text-[#333333] hover:bg-[#F5F5F5]"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Unlink
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/teachers')}
            className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
          >
            Back to List
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/teachers/${id}/edit`)}
            className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
          >
            Edit Teacher
          </Button>
          <Button
            onClick={() => navigate(`/admin/teachers/${id}/students`)}
            className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
          >
            Manage Students
          </Button>
        </div>
      </div>

      {/* Unlink Confirmation Modal */}
      <Dialog open={unlinkOpen} onOpenChange={setUnlinkOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#1A1A1A]">Unlink Student</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-[#4A4A4A]">
              Are you sure you want to unlink <span className="font-medium">{studentToUnlink?.name}</span> from <span className="font-medium">{teacher.name}</span>?
            </p>
            <p className="text-sm text-[#757575] mt-2">
              This student will no longer be assigned to this teacher.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUnlinkOpen(false)}
              className="border-[#9E9E9E] text-[#333333]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmUnlink}
              className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
            >
              Unlink Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}