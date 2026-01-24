import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { User, BookOpen, ArrowLeft, X } from 'lucide-react';
import { STUDENTS } from '@/data/constants';
import { toast } from 'sonner';

export default function ViewExpertCaseload() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Unlink Modal State
  const [unlinkOpen, setUnlinkOpen] = useState(false);
  const [studentToUnlink, setStudentToUnlink] = useState<{ id: string; name: string } | null>(null);

  // Mock data
  const expert = {
    id: id || 'BE-2024-001',
    name: 'Dr. Sarah Mitchell',
    email: 'sarah.mitchell@lincolnelementary.edu',
    phone: '(555) 345-6789',
    expertId: 'BE-2024-001',
    status: 'Active',
    specialization: 'Behavioral Psychology',
    joinedDate: 'August 15, 2024',
  };

  // Get assigned students
  const assignedStudents = STUDENTS.slice(0, 8).map((student, index) => ({
    ...student,
    assignedDate: new Date(2024, 8 + index, 10).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    incidentCount: Math.floor(Math.random() * 10) + 3,
    lastIncident: `${Math.floor(Math.random() * 14) + 1} days ago`,
    priority: index < 2 ? 'High' : index < 5 ? 'Medium' : 'Low',
  }));

  const handleUnlink = (student: { id: string; name: string }) => {
    setStudentToUnlink(student);
    setUnlinkOpen(true);
  };

  const handleConfirmUnlink = () => {
    if (studentToUnlink) {
      toast.success(`${studentToUnlink.name} has been unlinked from ${expert.name}`);
      setUnlinkOpen(false);
      setStudentToUnlink(null);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <Link to="/admin/experts" className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] text-sm mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Expert Management
          </Link>
          <div>
            <h1 className="text-2xl text-[#1A1A1A]">{expert.name} - Caseload</h1>
            <p className="text-sm text-[#757575] mt-1">Managing assigned students and cases</p>
          </div>
        </div>

        {/* Expert Summary */}
        <Card className="border-[#D0D0D0] p-6 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <User className="w-5 h-5 text-[#333333]" />
            <h2 className="text-sm font-medium text-[#757575]">Expert Information</h2>
          </div>
          <p className="text-2xl font-medium text-[#1A1A1A] mb-1">{expert.name}</p>
          <p className="text-sm text-[#757575]">{expert.specialization}</p>
          <p className="text-sm text-[#757575] mt-2">{expert.expertId}</p>
        </Card>

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
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Incidents</th>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Last Incident</th>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Priority</th>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Assigned Date</th>
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
                      <td className="p-4 text-[#1A1A1A]">{student.incidentCount}</td>
                      <td className="p-4 text-[#757575]">{student.lastIncident}</td>
                      <td className="p-4">
                        <Badge className={`${
                          student.priority === 'High' ? 'bg-[#333333]' :
                          student.priority === 'Medium' ? 'bg-[#666666]' :
                          'bg-[#9E9E9E]'
                        } text-white`}>
                          {student.priority}
                        </Badge>
                      </td>
                      <td className="p-4 text-[#757575]">{student.assignedDate}</td>
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
            onClick={() => navigate('/admin/experts')}
            className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
          >
            Back to Expert List
          </Button>
          <Button
            onClick={() => navigate(`/admin/experts/${id}/edit`)}
            className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
          >
            Edit Expert Profile
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
              Are you sure you want to unlink <span className="font-medium">{studentToUnlink?.name}</span> from <span className="font-medium">{expert.name}</span>?
            </p>
            <p className="text-sm text-[#757575] mt-2">
              This student will no longer be assigned to this behavioral expert.
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
