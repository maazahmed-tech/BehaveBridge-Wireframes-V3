import { useNavigate } from 'react-router-dom';
import { Plus, Users, UserCheck } from 'lucide-react';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const statistics = {
    students: 247,
    teachers: 18,
    experts: 3,
    parents: 412,
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Admin Dashboard</h1>
          <p className="text-[#757575]">Lincoln Elementary School</p>
        </div>

        {/* User Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 border border-[#D0D0D0] bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-[#4A4A4A]">Students</p>
                <p className="text-3xl font-bold text-[#1A1A1A]">
                  {statistics.students}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                <Users className="w-6 h-6 text-[#4A4A4A]" />
              </div>
            </div>
            <Button
              onClick={() => navigate('/admin/students/new')}
              className="w-full bg-[#333333] hover:bg-[#1A1A1A] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </Card>

          <Card className="p-6 border border-[#D0D0D0] bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-[#4A4A4A]">Teachers</p>
                <p className="text-3xl font-bold text-[#1A1A1A]">
                  {statistics.teachers}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-[#4A4A4A]" />
              </div>
            </div>
            <Button
              onClick={() => navigate('/admin/teachers/new')}
              className="w-full bg-[#333333] hover:bg-[#1A1A1A] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Teacher
            </Button>
          </Card>

          <Card className="p-6 border border-[#D0D0D0] bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-[#4A4A4A]">Behavioral Experts</p>
                <p className="text-3xl font-bold text-[#1A1A1A]">
                  {statistics.experts}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-[#4A4A4A]" />
              </div>
            </div>
            <Button
              onClick={() => navigate('/admin/experts/new')}
              className="w-full bg-[#333333] hover:bg-[#1A1A1A] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Expert
            </Button>
          </Card>

          <Card className="p-6 border border-[#D0D0D0] bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-[#4A4A4A]">Parents</p>
                <p className="text-3xl font-bold text-[#1A1A1A]">
                  {statistics.parents}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                <Users className="w-6 h-6 text-[#4A4A4A]" />
              </div>
            </div>
            <Button
              onClick={() => navigate('/admin/parents/new')}
              className="w-full bg-[#333333] hover:bg-[#1A1A1A] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Parent
            </Button>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}