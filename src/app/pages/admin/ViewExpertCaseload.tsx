import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Link } from 'react-router-dom';
import { Users, User, Mail, FileText, Calendar, BookOpen } from 'lucide-react';
import { STUDENTS } from '@/data/constants';

export default function ViewExpertCaseload() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const expert = {
    id: id || 'BE-2024-001',
    name: 'Dr. Sarah Mitchell',
    email: 'sarah.mitchell@lincolnelementary.edu',
    phone: '(555) 345-6789',
    expertId: 'BE-2024-001',
    status: 'Active',
    specialization: 'Behavioral Psychology',
    caseloadLimit: 15,
    currentCaseload: 8,
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

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header className="bg-white border-b border-[#D0D0D0] px-8 py-4 mb-8">
        <div>
          <Link to="/admin/experts" className="text-[#4A4A4A] hover:text-[#1A1A1A] text-sm mb-2 block">
            ← Back to Expert Management
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl text-[#1A1A1A]">{expert.name} - Caseload</h1>
              <p className="text-sm text-[#757575] mt-1">Managing assigned students and cases</p>
            </div>
            <Badge className="bg-[#333333] text-white">
              {expert.currentCaseload} / {expert.caseloadLimit} Students
            </Badge>
          </div>
        </div>
      </header>

      <div className="px-8 pb-8 max-w-6xl">
        {/* Expert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="border-[#D0D0D0] p-6">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-[#333333]" />
              <h2 className="text-sm font-medium text-[#757575]">Expert Information</h2>
            </div>
            <p className="text-2xl font-medium text-[#1A1A1A] mb-1">{expert.name}</p>
            <p className="text-sm text-[#757575]">{expert.specialization}</p>
            <p className="text-sm text-[#757575] mt-2">{expert.expertId}</p>
          </Card>

          <Card className="border-[#D0D0D0] p-6">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-[#333333]" />
              <h2 className="text-sm font-medium text-[#757575]">Caseload Status</h2>
            </div>
            <p className="text-2xl font-medium text-[#1A1A1A] mb-1">{expert.currentCaseload} Students</p>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-[#757575] mb-1">
                <span>Capacity</span>
                <span>{Math.round((expert.currentCaseload / expert.caseloadLimit) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#333333]"
                  style={{ width: `${(expert.currentCaseload / expert.caseloadLimit) * 100}%` }}
                />
              </div>
            </div>
          </Card>

          <Card className="border-[#D0D0D0] p-6">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-[#333333]" />
              <h2 className="text-sm font-medium text-[#757575]">Available Capacity</h2>
            </div>
            <p className="text-2xl font-medium text-[#1A1A1A] mb-1">
              {expert.caseloadLimit - expert.currentCaseload} Slots
            </p>
            <p className="text-sm text-[#757575]">Can accept more students</p>
          </Card>
        </div>

        {/* Assigned Students */}
        <Card className="border-[#D0D0D0] p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-[#333333]" />
              <h2 className="text-lg font-medium text-[#1A1A1A]">Assigned Students</h2>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate(`/admin/experts/${id}/assign`)}
              className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
            >
              Assign New Student
            </Button>
          </div>

          {assignedStudents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#757575] mb-4">No students currently assigned</p>
              <Button
                onClick={() => navigate(`/admin/experts/${id}/assign`)}
                className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
              >
                Assign Students
              </Button>
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
                  </tr>
                </thead>
                <tbody>
                  {assignedStudents.map((student, index) => (
                    <tr
                      key={student.id}
                      className={`border-b border-[#E0E0E0] hover:bg-[#FAFAFA] cursor-pointer ${
                        index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                      }`}
                      onClick={() => navigate(`/admin/students/${student.id}`)}
                    >
                      <td className="p-4 text-[#1A1A1A] font-medium">{student.name}</td>
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
    </div>
  );
}
