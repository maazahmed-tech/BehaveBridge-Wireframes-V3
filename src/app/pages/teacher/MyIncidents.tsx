import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Search, Filter, ChevronRight } from 'lucide-react';
import { TeacherLayout } from '@/app/components/TeacherLayout';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { STUDENTS } from '@/data/constants';

export default function MyIncidents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock incident data
  const incidents = [
    {
      id: 'ESC-2026-0156',
      date: '2026-01-15',
      time: '09:45 AM',
      student: 'Marcus Thompson',
      category: 'Disruptive Behavior',
      severity: 'Medium',
      outcome: 'Resolved',
    },
    {
      id: 'ESC-2026-0155',
      date: '2026-01-14',
      time: '11:20 AM',
      student: 'Emily Chen',
      category: 'Academic Avoidance',
      severity: 'Low',
      outcome: 'Resolved',
    },
    {
      id: 'ESC-2026-0154',
      date: '2026-01-14',
      time: '02:15 PM',
      student: 'Marcus Thompson',
      category: 'Peer Conflict',
      severity: 'Medium',
      outcome: 'Resolved',
    },
    {
      id: 'ESC-2026-0153',
      date: '2026-01-13',
      time: '10:30 AM',
      student: 'David Rodriguez',
      category: 'Verbal Outburst',
      severity: 'High',
      outcome: 'Escalated',
    },
    {
      id: 'ESC-2026-0152',
      date: '2026-01-11',
      time: '01:45 PM',
      student: 'Sofia Garcia',
      category: 'Physical Aggression',
      severity: 'High',
      outcome: 'Escalated',
    },
    {
      id: 'ESC-2026-0151',
      date: '2026-01-12',
      time: '09:15 AM',
      student: 'Marcus Thompson',
      category: 'Disruptive Behavior',
      severity: 'High',
      outcome: 'Escalated',
    },
    {
      id: 'ESC-2026-0150',
      date: '2026-01-10',
      time: '11:00 AM',
      student: 'Emily Chen',
      category: 'Academic Avoidance',
      severity: 'Low',
      outcome: 'Resolved',
    },
    {
      id: 'ESC-2026-0149',
      date: '2026-01-08',
      time: '02:30 PM',
      student: 'David Rodriguez',
      category: 'Academic Frustration',
      severity: 'Medium',
      outcome: 'Escalated',
    },
  ];

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      searchTerm === '' ||
      incident.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || incident.outcome.toLowerCase() === statusFilter;

    const incidentDate = new Date(incident.date);
    const today = new Date('2026-01-15');
    const matchesDate =
      dateFilter === 'all' ||
      (dateFilter === 'today' && incident.date === '2026-01-15') ||
      (dateFilter === 'week' &&
        incidentDate >= new Date('2026-01-09') &&
        incidentDate <= today) ||
      (dateFilter === 'month' &&
        incidentDate >= new Date('2026-01-01') &&
        incidentDate <= today);

    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-[#757575] text-white';
      case 'Partial':
        return 'bg-[#9E9E9E] text-white';
      case 'Escalated':
        return 'bg-[#1A1A1A] text-white';
      case 'Follow-up':
        return 'bg-[#E0E0E0] text-[#4A4A4A]';
      default:
        return 'bg-[#F5F5F5] text-[#4A4A4A]';
    }
  };

  return (
    <TeacherLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">My Incidents</h1>
          <p className="text-sm md:text-base text-[#4A4A4A]">
            View and manage your incident reports
          </p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#757575]" />
            <Input
              placeholder="Search by student name or incident ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#D0D0D0]"
            />
          </div>

          <div className="w-full md:w-48">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="border-[#D0D0D0] text-[#1A1A1A]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-[#D0D0D0] text-[#1A1A1A]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={() => navigate('/teacher/incidents/new')}
            className="bg-[#333333] hover:bg-[#1A1A1A] text-white whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Log New Incident
          </Button>
        </div>

        {/* Incident Count */}
        <div className="mb-4">
          <p className="text-sm text-[#4A4A4A]">
            Showing {filteredIncidents.length} of {incidents.length} incidents
          </p>
        </div>

        {/* Incidents List */}
        {filteredIncidents.length === 0 ? (
          <Card className="border-[#D0D0D0] p-12">
            <div className="text-center">
              <p className="text-[#757575] mb-4">
                No incidents found with the selected filters
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setDateFilter('all');
                }}
                variant="outline"
                className="border-[#9E9E9E] text-[#333333] hover:bg-[#F5F5F5]"
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {filteredIncidents.map((incident) => (
                <Link key={incident.id} to={`/teacher/incidents/${incident.id}`}>
                  <div className="bg-white border border-[#D0D0D0] rounded-lg p-4 hover:bg-[#F5F5F5] active:bg-[#E0E0E0] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-[#1A1A1A]">{incident.student}</h3>
                        <p className="text-sm text-[#757575]">{incident.category}</p>
                      </div>
                      <Badge className={getStatusColor(incident.outcome)}>
                        {incident.outcome}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-[#757575]">
                        {new Date(incident.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })} • {incident.time}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#4A4A4A]">{incident.severity}</span>
                        <ChevronRight className="w-4 h-4 text-[#9E9E9E]" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white border border-[#D0D0D0] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F5F5F5] border-b border-[#D0D0D0]">
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">
                      Date/Time
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">
                      Student
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">
                      Category
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">
                      Severity
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">
                      Status
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-[#4A4A4A]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIncidents.map((incident, index) => (
                    <tr
                      key={incident.id}
                      className={`border-b border-[#E0E0E0] hover:bg-[#FAFAFA] ${
                        index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                      }`}
                    >
                      <td className="p-4">
                        <div className="text-[#1A1A1A] font-medium">
                          {new Date(incident.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-sm text-[#757575]">
                          {incident.time}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-[#1A1A1A]">
                          {incident.student}
                        </div>
                      </td>
                      <td className="p-4 text-[#4A4A4A]">{incident.category}</td>
                      <td className="p-4 text-[#4A4A4A]">{incident.severity}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(incident.outcome)}>
                          {incident.outcome}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Link to={`/teacher/incidents/${incident.id}`}>
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
          </>
        )}

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-[#4A4A4A]">
            Page 1 of 1
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="border-[#D0D0D0] text-[#757575]"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="border-[#D0D0D0] text-[#757575]"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}