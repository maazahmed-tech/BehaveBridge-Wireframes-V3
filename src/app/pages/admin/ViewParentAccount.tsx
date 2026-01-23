import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, FileText, CheckCircle2, XCircle, Users } from 'lucide-react';
import { STUDENTS } from '@/data/constants';

export default function ViewParentAccount() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const parent = {
    id: id || 'P-2024-0456',
    name: 'Jennifer Rodriguez',
    email: 'jennifer.rodriguez@email.com',
    phone: '(555) 987-6543',
    alternatePhone: '(555) 123-4567',
    parentId: 'P-2024-0456',
    status: 'Active',
    activationStatus: 'Activated',
    createdDate: 'September 5, 2024',
    activatedDate: 'September 6, 2024',
    lastLogin: 'January 13, 2026 at 4:45 PM',
    accountActivated: true,
    passwordLastChanged: 'January 2, 2026',
    linkedStudents: 2,
    incidentsViewed: 18,
    messagesReceived: 12,
    messagesRead: 11,
  };

  // Get linked students
  const linkedStudents = STUDENTS.slice(0, 2).map((student) => ({
    ...student,
    linkedDate: 'September 5, 2024',
    recentIncidents: Math.floor(Math.random() * 5) + 1,
  }));

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header className="bg-white border-b border-[#D0D0D0] px-8 py-4 mb-8">
        <div>
          <Link to="/admin/parents" className="text-[#4A4A4A] hover:text-[#1A1A1A] text-sm mb-2 block">
            ← Back to Parent Management
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl text-[#1A1A1A]">{parent.name}</h1>
              <p className="text-sm text-[#757575] mt-1">Parent Account Details</p>
            </div>
            <div className="flex gap-2">
              <Badge className={`${
                parent.accountActivated ? 'bg-[#333333]' : 'bg-[#757575]'
              } text-white`}>
                {parent.activationStatus}
              </Badge>
              <Badge className={`${
                parent.status === 'Active' ? 'bg-[#333333]' : 'bg-[#757575]'
              } text-white`}>
                {parent.status}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 pb-8 max-w-5xl">
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
                <p className="text-[#1A1A1A] font-medium">{parent.name}</p>
              </div>
              <div>
                <p className="text-sm text-[#757575]">Parent ID</p>
                <p className="text-[#1A1A1A] font-medium">{parent.parentId}</p>
              </div>
              <div>
                <p className="text-sm text-[#757575]">Linked Students</p>
                <p className="text-[#1A1A1A]">{parent.linkedStudents} student(s)</p>
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
                <p className="text-[#1A1A1A] break-all">{parent.email}</p>
              </div>
              <div>
                <p className="text-sm text-[#757575]">Primary Phone</p>
                <p className="text-[#1A1A1A]">{parent.phone}</p>
              </div>
              <div>
                <p className="text-sm text-[#757575]">Alternate Phone</p>
                <p className="text-[#1A1A1A]">{parent.alternatePhone}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Linked Students */}
        <Card className="border-[#D0D0D0] p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#333333]" />
              <h2 className="text-lg font-medium text-[#1A1A1A]">Linked Students</h2>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate(`/admin/parents/${id}/link`)}
              className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
            >
              Link Additional Student
            </Button>
          </div>

          <div className="bg-white border border-[#D0D0D0] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#F5F5F5] border-b border-[#D0D0D0]">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Student Name</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Student ID</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Grade</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Primary Teacher</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Recent Incidents</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Linked Date</th>
                </tr>
              </thead>
              <tbody>
                {linkedStudents.map((student, index) => (
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
                    <td className="p-4 text-[#757575]">{student.primaryTeacher}</td>
                    <td className="p-4 text-[#1A1A1A]">{student.recentIncidents}</td>
                    <td className="p-4 text-[#757575]">{student.linkedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Account Status */}
        <Card className="border-[#D0D0D0] p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-[#333333]" />
            <h2 className="text-lg font-medium text-[#1A1A1A]">Account Status</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              {parent.accountActivated ? (
                <CheckCircle2 className="w-5 h-5 text-[#333333] mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-[#757575] mt-0.5" />
              )}
              <div>
                <p className="text-sm text-[#757575]">Account Activation</p>
                <p className="text-[#1A1A1A] font-medium">
                  {parent.accountActivated ? 'Activated' : 'Not Activated'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#333333] mt-0.5" />
              <div>
                <p className="text-sm text-[#757575]">Account Created</p>
                <p className="text-[#1A1A1A]">{parent.createdDate}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-[#757575]">Activation Date</p>
              <p className="text-[#1A1A1A]">{parent.activatedDate}</p>
            </div>
            <div>
              <p className="text-sm text-[#757575]">Last Login</p>
              <p className="text-[#1A1A1A]">{parent.lastLogin}</p>
            </div>
            <div>
              <p className="text-sm text-[#757575]">Password Last Changed</p>
              <p className="text-[#1A1A1A]">{parent.passwordLastChanged}</p>
            </div>
          </div>
        </Card>

        {/* Activity Summary */}
        <Card className="border-[#D0D0D0] p-6 mb-6">
          <h2 className="text-lg font-medium text-[#1A1A1A] mb-4">Activity Summary</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-4 bg-[#F5F5F5] rounded-lg">
              <p className="text-3xl font-medium text-[#1A1A1A] mb-1">{parent.incidentsViewed}</p>
              <p className="text-sm text-[#757575]">Incidents Viewed</p>
            </div>
            <div className="text-center p-4 bg-[#F5F5F5] rounded-lg">
              <p className="text-3xl font-medium text-[#1A1A1A] mb-1">{parent.messagesReceived}</p>
              <p className="text-sm text-[#757575]">Messages Received</p>
            </div>
            <div className="text-center p-4 bg-[#F5F5F5] rounded-lg">
              <p className="text-3xl font-medium text-[#1A1A1A] mb-1">{parent.messagesRead}</p>
              <p className="text-sm text-[#757575]">Messages Read</p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/parents')}
            className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
          >
            Back to List
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/parents/${id}/edit`)}
            className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
          >
            Edit Parent
          </Button>
          <Button
            onClick={() => navigate(`/admin/parents/${id}/link`)}
            className="bg-[#333333] hover:bg-[#1A1A1A] text-white"
          >
            Link Student
          </Button>
        </div>
      </div>
    </div>
  );
}
