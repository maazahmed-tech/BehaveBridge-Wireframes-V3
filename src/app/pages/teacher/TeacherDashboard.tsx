import { useNavigate } from 'react-router-dom';
import { Plus, Search, FileText, User } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { STUDENTS } from '@/data/constants';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const today = 'Thursday, January 15, 2026';

  const recentStudents = STUDENTS.slice(0, 3);

  const todaysIncidents = [
    {
      time: '9:45 AM',
      student: 'Marcus Thompson',
      trigger: 'Peer conflict',
      status: 'Resolved',
    },
    {
      time: '11:20 AM',
      student: 'Sofia Garcia',
      trigger: 'Task avoidance',
      status: 'Partial',
    },
  ];

  return (
    <TeacherLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
            Good morning, Maria
          </h1>
          <p className="text-sm md:text-base text-[#757575]">{today}</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => navigate('/teacher/incidents/new')}
            className="bg-[#333333] hover:bg-[#1A1A1A] text-white h-12 rounded-lg"
          >
            <Plus className="w-5 h-5 mr-2" />Log New Incident
          </Button>
          <Button
            onClick={() => navigate('/teacher/students')}
            variant="outline"
            className="border-[#D0D0D0] text-[#333333] hover:bg-[#F5F5F5] h-12 rounded-lg"
          >
            <Search className="w-5 h-5 mr-2" />
            Find Student
          </Button>
          <Button
            onClick={() => navigate('/teacher/incidents')}
            variant="outline"
            className="border-[#D0D0D0] text-[#333333] hover:bg-[#F5F5F5] h-12 rounded-lg"
          >
            <FileText className="w-5 h-5 mr-2" />
            View My Incidents
          </Button>
        </div>

        {/* Recently Accessed Students */}
        <Card className="p-6 border border-[#D0D0D0] bg-white">
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
            Recently Accessed Students
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentStudents.map((student) => (
              <Card
                key={student.id}
                className="p-4 border border-[#E0E0E0] hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/teacher/students/${student.id}`)}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#E0E0E0] flex items-center justify-center">
                    <User className="w-5 h-5 text-[#757575]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A]">
                      {student.name}
                    </h3>
                    <p className="text-sm text-[#757575]">Grade {student.grade}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-[#D0D0D0] text-[#333333] hover:bg-[#F5F5F5] rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/teacher/students/${student.id}`);
                  }}
                >
                  View Profile
                </Button>
              </Card>
            ))}
          </div>
        </Card>

        {/* Today's Incident Shortcuts */}
        <Card className="p-6 border border-[#D0D0D0] bg-white">
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
            Recent Incident
          </h2>
          <div className="space-y-3">
            {todaysIncidents.map((incident, index) => (
              <div
                key={index}
                className="p-4 border border-[#E0E0E0] rounded-lg hover:bg-[#F5F5F5] cursor-pointer"
              >
                {/* Mobile: stacked layout */}
                <div className="flex flex-col space-y-2 md:hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[#1A1A1A] font-medium">
                      {incident.student}
                    </span>
                    <Badge
                      variant={incident.status === 'Resolved' ? 'outline' : 'secondary'}
                      className={
                        incident.status === 'Resolved'
                          ? 'border-[#9E9E9E] text-[#4A4A4A]'
                          : 'bg-[#E0E0E0] text-[#4A4A4A]'
                      }
                    >
                      {incident.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-[#757575]">
                    <span>{incident.time}</span>
                    <span>•</span>
                    <span>{incident.trigger}</span>
                  </div>
                </div>
                {/* Desktop: horizontal layout */}
                <div className="hidden md:flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-[#757575]">
                        {incident.time}
                      </span>
                      <span className="text-[#1A1A1A] font-medium">
                        {incident.student}
                      </span>
                      <span className="text-[#4A4A4A]">{incident.trigger}</span>
                    </div>
                  </div>
                  <Badge
                    variant={incident.status === 'Resolved' ? 'outline' : 'secondary'}
                    className={
                      incident.status === 'Resolved'
                        ? 'border-[#9E9E9E] text-[#4A4A4A]'
                        : 'bg-[#E0E0E0] text-[#4A4A4A]'
                    }
                  >
                    {incident.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </TeacherLayout>
  );
}