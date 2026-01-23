import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { STUDENTS, STAFF } from '@/data/constants';

export default function EscalationsList() {
  const [statusFilter, setStatusFilter] = useState('all');

  const escalations = [
    {
      id: 'ESC-2026-0045',
      student: STUDENTS[0],
      submittedDate: '2026-01-12',
      expert: STAFF['BE-2024-0023'],
      status: 'Under Review',
      parentAcknowledged: true,
    },
    {
      id: 'ESC-2026-0032',
      student: STUDENTS[4],
      submittedDate: '2026-01-10',
      expert: STAFF['BE-2024-0023'],
      status: 'Resolved',
      parentAcknowledged: false,
    },
    {
      id: 'ESC-2026-0021',
      student: STUDENTS[6],
      submittedDate: '2026-01-08',
      expert: STAFF['BE-2024-0023'],
      status: 'Resolved',
      parentAcknowledged: true,
    },
    {
      id: 'ESC-2026-0015',
      student: STUDENTS[0],
      submittedDate: '2026-01-05',
      expert: STAFF['BE-2024-0023'],
      status: 'Resolved',
      parentAcknowledged: true,
    },
  ];

  const filteredEscalations = escalations.filter(esc => 
    statusFilter === 'all' || esc.status.toLowerCase().replace(' ', '-') === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Review': return 'bg-[#E0E0E0] text-[#4A4A4A]';
      case 'Under Review': return 'bg-[#9E9E9E] text-white';
      case 'Resolved': return 'bg-[#757575] text-white';
      default: return 'bg-[#F5F5F5] text-[#4A4A4A]';
    }
  };

  return (
    <TeacherLayout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl text-[#1A1A1A] mb-2">Escalation Status</h1>
          <p className="text-[#4A4A4A]">Track your escalations to behavioral experts</p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-64">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-[#D0D0D0] text-[#1A1A1A]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="flex-1 border-[#D0D0D0] p-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#9E9E9E]"></div>
                <span className="text-[#4A4A4A]">Under Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#757575]"></div>
                <span className="text-[#4A4A4A]">Resolved</span>
              </div>
            </div>
          </Card>
        </div>

        {filteredEscalations.length === 0 ? (
          <Card className="border-[#D0D0D0] p-12">
            <div className="text-center">
              <p className="text-[#757575] mb-4">No escalations found with the selected filter</p>
              <Button
                onClick={() => setStatusFilter('all')}
                variant="outline"
                className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
              >
                Clear Filter
              </Button>
            </div>
          </Card>
        ) : (
          <div className="bg-white border border-[#D0D0D0] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F5F5F5] border-b border-[#D0D0D0]">
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">ID</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Student</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Submitted Date</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Expert</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Parent Ack.</th>
                  <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEscalations.map((escalation, index) => (
                  <tr
                    key={escalation.id}
                    className={`border-b border-[#E0E0E0] hover:bg-[#FAFAFA] ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                    }`}
                  >
                    <td className="p-4 text-[#1A1A1A] font-medium">{escalation.id}</td>
                    <td className="p-4">
                      <div className="text-[#1A1A1A]">{escalation.student.name}</div>
                      <div className="text-sm text-[#757575]">Grade {escalation.student.grade}</div>
                    </td>
                    <td className="p-4 text-[#4A4A4A]">
                      {new Date(escalation.submittedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="p-4">
                      <div className="text-[#1A1A1A]">{escalation.expert.name}</div>
                      <div className="text-sm text-[#757575]">{escalation.expert.role}</div>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(escalation.status)}>
                        {escalation.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {escalation.parentAcknowledged ? (
                        <Badge className="bg-[#757575] text-white">
                          Acknowledged
                        </Badge>
                      ) : (
                        <Badge className="bg-[#E0E0E0] text-[#4A4A4A]">
                          Not yet acknowledged
                        </Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <Link to={`/teacher/escalations/${escalation.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
                        >
                          View Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}