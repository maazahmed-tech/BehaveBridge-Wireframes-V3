import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, FileText, CheckCircle2, XCircle } from 'lucide-react';

export default function ViewTeacherAccount() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const teacher = {
    name: 'Maria Johnson',
    email: 'maria.johnson@lincolnelementary.edu',
    phone: '(555) 234-5678',
    status: 'Active',
    role: 'Classroom Teacher',
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header className="bg-white border-b border-[#D0D0D0] px-8 py-4 mb-8">
        <div>
          <Link to="/admin/teachers" className="text-[#4A4A4A] hover:text-[#1A1A1A] text-sm mb-2 block">
            ← Back to Teacher Management
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
    </div>
  );
}